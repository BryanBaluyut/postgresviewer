import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { Client } from 'pg';

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

app.post('/api/connect', async (req, res) => {
  console.log('Received connection request:', { ...req.body, password: '***' });
    const { host, port, user, password, database, connectionTimeoutMillis } = req.body;
  
  if (!host || !port || !user || !password) {
    return res.status(400).json({
      success: false,
      error: 'Missing required connection parameters'
    });
  }

  const client = new Client({
    host,
    port,
    user,
    password,
    database: database || 'postgres',
    connectionTimeoutMillis: connectionTimeoutMillis || 10000, // Default 10 second timeout
  });

  try {
    console.log('Attempting to connect to PostgreSQL server...');
    await client.connect();
    console.log('Successfully connected to PostgreSQL server');

    console.log('Querying for databases...');
    const result = await client.query(
      'SELECT datname FROM pg_database WHERE datistemplate = false ORDER BY datname'
    );
    const databases = result.rows.map((row: { datname: string }) => row.datname);
    console.log('Found databases:', databases);

    await client.end();
    res.json({ success: true, databases });
  } catch (error) {
    console.error('Database error:', error);
    let errorMessage = 'An unexpected error occurred';
      if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Could not connect to PostgreSQL server. Please check if it is running and the connection details are correct.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'Connection timed out. The server took too long to respond.';
      } else {
        errorMessage = error.message;
      }
    }

    res.status(500).json({ 
      success: false, 
      error: errorMessage
    });
  } finally {
    if (client) {
      try {
        await client.end();
      } catch (err) {
        console.error('Error closing client:', err);
      }
    }
  }
});

try {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
} catch (error) {
  console.error('Failed to start server:', error);
}
