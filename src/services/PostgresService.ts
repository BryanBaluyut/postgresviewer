type PostgresConnection = {
  name?: string;
  host: string;
  port: number;
  user: string;
  password: string;
  database?: string;
};

class PostgresService {
  private apiUrl = 'http://localhost:3000/api';
  private databases: string[] = [];

  async connect(config: PostgresConnection): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiUrl}/connect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      const data = await response.json();
      
      if (data.success) {
        this.databases = data.databases;
        return true;
      }
      
      throw new Error(data.error || 'Failed to connect');
    } catch (error) {
      console.error('Connection error:', error);
      throw error;
    }
  }

  async listDatabases(): Promise<string[]> {
    return this.databases;
  }

  async disconnect(): Promise<void> {
    this.databases = [];
  }
}

export type { PostgresConnection };
export { PostgresService };
