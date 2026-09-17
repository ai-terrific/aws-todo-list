import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ListTodo, CheckCheck } from 'lucide-react';
import { TodoFilter } from '../types';

interface EmptyStateProps {
  filter: TodoFilter;
  hasAnyTodos: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ filter, hasAnyTodos }) => {
  let title = 'No tasks yet';
  let description = 'Add your first task above to get started!';
  let Icon = ListTodo;

  if (hasAnyTodos) {
    if (filter === 'active') {
      title = 'No active tasks';
      description = 'All your tasks are completed. Great job!';
      Icon = CheckCheck;
    } else if (filter === 'completed') {
      title = 'No completed tasks yet';
      description = 'Check off tasks as you finish them.';
      Icon = ListTodo;
    }
  }

  return (
    <Box
      id="todo-empty-state"
      sx={{
        py: 6,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          backgroundColor: '#F1F5F9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748B',
          mb: 2,
        }}
      >
        <Icon size={28} />
      </Box>
      <Typography
        id="empty-state-title"
        variant="h6"
        sx={{ fontWeight: 600, color: '#334155', mb: 0.5, fontSize: '1.05rem' }}
      >
        {title}
      </Typography>
      <Typography
        id="empty-state-desc"
        variant="body2"
        sx={{ color: '#64748B', maxWidth: 320 }}
      >
        {description}
      </Typography>
    </Box>
  );
};
