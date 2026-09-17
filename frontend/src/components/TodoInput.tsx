import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  onAdd: (title: string, description?: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setTitleError(true);
      return;
    }

    const trimmedDescription = description.trim();
    onAdd(trimmedTitle, trimmedDescription ? trimmedDescription : undefined);
    setTitle('');
    setDescription('');
    setTitleError(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // If user presses Enter without Shift, submit form
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleDescriptionKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Paper
      id="todo-input-card"
      variant="outlined"
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        borderColor: '#E2E8F0',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      <TextField
        id="todo-title-input"
        fullWidth
        size="small"
        label="Task Name"
        placeholder="e.g. Prepare presentation slides"
        value={title}
        error={titleError}
        helperText={titleError ? 'Task name is required' : undefined}
        onChange={(e) => {
          setTitle(e.target.value);
          if (titleError) setTitleError(false);
        }}
        onKeyDown={handleTitleKeyDown}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: '#F8FAFC',
            '& fieldset': {
              borderColor: '#E2E8F0',
            },
            '&:hover fieldset': {
              borderColor: '#CBD5E1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2563EB',
            },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF',
            },
          },
        }}
      />

      <TextField
        id="todo-description-input"
        fullWidth
        size="small"
        multiline
        rows={2}
        label="Description (optional)"
        placeholder="Add details, notes, or sub-tasks..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyDown={handleDescriptionKeyDown}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: '#F8FAFC',
            '& fieldset': {
              borderColor: '#E2E8F0',
            },
            '&:hover fieldset': {
              borderColor: '#CBD5E1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2563EB',
            },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF',
            },
          },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1,
          pt: 0.5,
        }}
      >
        <Button
          id="todo-add-button"
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<Plus size={18} />}
          sx={{
            px: 2.5,
            py: 1,
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          Add Task
        </Button>
      </Box>
    </Paper>
  );
};
