import { useState } from 'react';
import { TextInput, PasswordInput, NumberInput, Button, Paper, Stack, Title } from '@mantine/core';
import type { PostgresConnection } from '../services/PostgresService';
import '@mantine/core/styles.css';

interface ConnectionFormProps {
  onConnect: (config: PostgresConnection) => Promise<void>;
  isConnecting: boolean;
}

export function ConnectionForm({ onConnect, isConnecting }: ConnectionFormProps) {
  const [formData, setFormData] = useState<PostgresConnection>({
    host: 'localhost',
    port: 5432,
    user: '',
    password: '',
    connectionTimeoutMillis: 10000,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.host?.trim()) {
      newErrors.host = 'Host is required';
    }
    
    if (!formData.port) {
      newErrors.port = 'Port is required';
    } else if (formData.port < 1 || formData.port > 65535) {
      newErrors.port = 'Port must be between 1 and 65535';
    }
    
    if (!formData.user?.trim()) {
      newErrors.user = 'Username is required';
    }
    
    if (!formData.password?.trim()) {
      newErrors.password = 'Password is required';
    }

    if (formData.connectionTimeoutMillis && (
      formData.connectionTimeoutMillis < 1000 || 
      formData.connectionTimeoutMillis > 60000
    )) {
      newErrors.connectionTimeoutMillis = 'Timeout must be between 1000ms and 60000ms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    onConnect(formData);
  };

  const handleInput = (field: keyof PostgresConnection, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Paper p="xl" shadow="md" radius="md" withBorder style={{ maxWidth: 400, margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Title order={2} ta="center">Connect to PostgreSQL</Title>
          
          <TextInput
            required
            label="Host"
            value={formData.host}
            onChange={(e) => handleInput('host', e.target.value)}
            error={errors.host}
          />
          
          <NumberInput
            required
            label="Port"
            value={formData.port}
            onChange={(value) => handleInput('port', Number(value) || 5432)}
            error={errors.port}
            min={1}
            max={65535}
          />
          
          <TextInput
            required
            label="Username"
            value={formData.user}
            onChange={(e) => handleInput('user', e.target.value)}
            error={errors.user}
          />
          
          <PasswordInput
            required
            label="Password"
            value={formData.password}
            onChange={(e) => handleInput('password', e.target.value)}
            error={errors.password}
          />
          
          <NumberInput
            label="Connection Timeout (ms)"
            description="Time to wait for a connection (in milliseconds)"
            value={formData.connectionTimeoutMillis}
            onChange={(value) => handleInput('connectionTimeoutMillis', Number(value) || 10000)}
            error={errors.connectionTimeoutMillis}
            min={1000}
            max={60000}
            step={1000}
          />

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
        </Stack>
      </form>
    </Paper>
  );
}
