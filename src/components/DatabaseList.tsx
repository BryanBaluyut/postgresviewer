import { Paper, Title, List, ThemeIcon } from '@mantine/core';
import { IconDatabase } from '@tabler/icons-react';
import '@mantine/core/styles.css';

interface DatabaseListProps {
  databases: string[];
}

export function DatabaseList({ databases }: DatabaseListProps) {  return (
    <Paper p="xl" shadow="md" radius="md" withBorder>
      <Title order={2} mb="xl" ta="center">Available Databases</Title>
      <List
        spacing="md"
        size="md"
        center
      >
        {databases.map((db) => (
          <List.Item key={db} icon={
            <ThemeIcon color="blue" size={24} radius="xl">
              <IconDatabase style={{ width: '1rem', height: '1rem' }} />
            </ThemeIcon>
          }>
            {db}
          </List.Item>
        ))}
      </List>
    </Paper>
  );
}
