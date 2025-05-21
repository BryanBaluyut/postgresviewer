import { useState, useEffect } from 'react';
import { TextInput, PasswordInput, NumberInput, Button, Paper, Stack, Title, Select, Group, ActionIcon, Modal } from '@mantine/core';
import { IconTrash, IconDeviceFloppy } from '@tabler/icons-react';
import type { PostgresConnection } from '../services/PostgresService';
import { SavedConnectionsService, SavedConnection } from '../services/SavedConnectionsService';
import '@mantine/core/styles.css';

interface ConnectionFormProps {
  onConnect: (config: PostgresConnection) => Promise<void>;
  isConnecting: boolean;
}

const savedConnectionsService = new SavedConnectionsService();

export function ConnectionForm({ onConnect, isConnecting }: ConnectionFormProps) {
  const [formData, setFormData] = useState<PostgresConnection>({
    name: '',
    host: 'localhost',
    port: 5432,
    user: '',
    password: '',
  });
  const [savedConnections, setSavedConnections] = useState<SavedConnection[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);

  useEffect(() => {
    setSavedConnections(savedConnectionsService.getSavedConnections());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConnect(formData);
  };

  const handleSaveConnection = () => {
    if (!formData.name) return;
    savedConnectionsService.saveConnection(formData);
    setSavedConnections(savedConnectionsService.getSavedConnections());
    setShowSaveModal(false);
  };

  const handleDeleteConnection = (name: string) => {
    savedConnectionsService.deleteConnection(name);
    setSavedConnections(savedConnectionsService.getSavedConnections());
  };

  const handleLoadConnection = (connection: SavedConnection) => {
    setFormData({
      ...connection,
      password: '', // Password is not stored in saved connections
    });
  };
  return (
    <Paper p="xl" shadow="md" radius="md" withBorder style={{ maxWidth: 400, margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Title order={2} ta="center">Connect to PostgreSQL</Title>{savedConnections.length > 0 && (
            <Group gap="xs">
              <Select
                w="100%"
                label="Saved Connections"
                placeholder="Select a saved connection"
                data={savedConnections.map(conn => ({
                  value: conn.name,
                  label: `${conn.name} (${conn.host}:${conn.port})`,
                }))}
                onChange={(value) => {
                  const connection = savedConnections.find(c => c.name === value);
                  if (connection) handleLoadConnection(connection);
                }}
                clearable
              />
              <ActionIcon
                variant="light"
                color="red"
                onClick={() => {
                  const currentConnection = savedConnections.find(c => c.name === formData.name);
                  if (currentConnection) handleDeleteConnection(currentConnection.name);
                }}
                disabled={!formData.name || !savedConnections.some(c => c.name === formData.name)}
                mt={28}  // Aligns with the Select input
              >
                <IconTrash size="1.2rem" />
              </ActionIcon>
            </Group>
          )}
          
          <TextInput
            label="Connection Name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          
          <TextInput
            required
            label="Host"
            value={formData.host}
            onChange={(e) => setFormData({ ...formData, host: e.target.value })}
          />
          
          <NumberInput
            required
            label="Port"
            value={formData.port}
            onChange={(value) => setFormData({ ...formData, port: Number(value) || 5432 })}
            min={1}
            max={65535}
          />
          
          <TextInput
            required
            label="Username"
            value={formData.user}
            onChange={(e) => setFormData({ ...formData, user: e.target.value })}
          />
          
          <PasswordInput
            required
            label="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
            <Group justify="space-between">
            <Button 
              type="submit" 
              loading={isConnecting}
              variant="filled"
              color="blue"
              size="md"
              radius="md"
              fullWidth
            >
              Connect
            </Button>
            <Button 
              variant="light"
              color="gray"
              size="md"
              radius="md"
              onClick={() => setShowSaveModal(true)}
              disabled={!formData.name}
            >
              Save Connection
            </Button>
          </Group>
        </Stack>
      </form>      <Modal
        opened={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        title="Save Connection"
        centered
        size="sm"
      >
        <Stack gap="lg">
          <TextInput
            label="Connection Name"
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            size="md"
          />
          <Group justify="flex-end" gap="md">
            <Button 
              onClick={() => setShowSaveModal(false)} 
              variant="subtle"
              color="gray"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveConnection} 
              disabled={!formData.name}
              color="blue"
            >
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Paper>
  );
}
