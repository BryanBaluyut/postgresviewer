import type { PostgresConnection } from './PostgresService';

type SavedConnection = Omit<PostgresConnection, 'password'> & {
  name: string;  // Name is required for saved connections
};

export class SavedConnectionsService {
  private storageKey = 'postgres-viewer-saved-connections';

  saveConnection(connection: PostgresConnection): void {
    if (!connection.name) {
      throw new Error('Connection must have a name to be saved');
    }

    const savedConnections = this.getSavedConnections();
    const connectionToSave: SavedConnection = {
      name: connection.name,
      host: connection.host,
      port: connection.port,
      user: connection.user,
      database: connection.database,
    };

    // Update existing or add new
    const existingIndex = savedConnections.findIndex(c => c.name === connection.name);
    if (existingIndex >= 0) {
      savedConnections[existingIndex] = connectionToSave;
    } else {
      savedConnections.push(connectionToSave);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(savedConnections));
  }

  getSavedConnections(): SavedConnection[] {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }

  deleteConnection(name: string): void {
    const savedConnections = this.getSavedConnections();
    const filtered = savedConnections.filter(c => c.name !== name);
    localStorage.setItem(this.storageKey, JSON.stringify(filtered));
  }
}

export type { SavedConnection };
