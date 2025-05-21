// This service has been disabled as the save connection functionality is not currently supported
import type { PostgresConnection } from './PostgresService';

// Kept for type compatibility but not used
type SavedConnection = {
  name: string;
  host: string;
  port: number;
  user: string;
  database?: string;
  connectionTimeoutMillis?: number;
};

export class SavedConnectionsService {
  getSavedConnections(): SavedConnection[] {
    return [];
  }
}

export type { SavedConnection };
