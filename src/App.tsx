import { useState } from 'react';
import { MantineProvider, Container, LoadingOverlay, Notification } from '@mantine/core';
import { ConnectionForm } from './components/ConnectionForm';
import { DatabaseList } from './components/DatabaseList';
import { PostgresService } from './services/PostgresService';
import type { PostgresConnection } from './services/PostgresService';
import '@mantine/core/styles.css';
import './App.css';

const postgresService = new PostgresService();

function App() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [databases, setDatabases] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleConnect = async (config: PostgresConnection) => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const connected = await postgresService.connect(config);
      if (connected) {
        const dbs = await postgresService.listDatabases();
        setDatabases(dbs);
      } else {
        setError('Failed to connect to database');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <MantineProvider defaultColorScheme="dark">
      <Container size="md" p="xl">
        <LoadingOverlay visible={isConnecting} />
        
        {error && (
          <Notification 
            color="red" 
            mb="md"
            onClose={() => setError(null)}
            title="Error"
          >
            {error}
          </Notification>
        )}
        
        {notification && (
          <Notification 
            color={notification.type === 'success' ? 'green' : 'red'}
            mb="md"
            onClose={() => setNotification(null)}
            title={notification.type === 'success' ? 'Success' : 'Error'}
          >
            {notification.message}
          </Notification>
        )}

        {databases.length === 0 ? (
          <ConnectionForm 
            onConnect={handleConnect} 
            isConnecting={isConnecting}
          />
        ) : (
          <DatabaseList databases={databases} />
        )}
      </Container>
    </MantineProvider>
  );
}

export default App;
