import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import { TodoFilter } from '../types';

interface TodoFiltersProps {
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}) => {
  const handleFilterChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFilter: TodoFilter | null
  ) => {
    if (newFilter !== null) {
      onFilterChange(newFilter);
    }
  };

  return (
    <Box
      id="todo-filters-bar"
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1.5,
        pt: 1.5,
        borderTop: '1px solid #E2E8F0',
      }}
    >
      <Typography
        id="todo-count-text"
        variant="body2"
        sx={{ color: '#64748B', fontWeight: 500 }}
      >
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </Typography>

      <ToggleButtonGroup
        id="todo-filter-group"
        value={filter}
        exclusive
        onChange={handleFilterChange}
        size="small"
        aria-label="task filters"
        sx={{
          '& .MuiToggleButton-root': {
            px: 1.75,
            py: 0.5,
            textTransform: 'capitalize',
            fontSize: '0.875rem',
            fontWeight: 500,
            borderColor: '#E2E8F0',
            color: '#64748B',
            '&.Mui-selected': {
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              fontWeight: 600,
              borderColor: '#BFDBFE',
              '&:hover': {
                backgroundColor: '#DBEAFE',
              },
            },
          },
        }}
      >
        <ToggleButton id="filter-all" value="all">
          All
        </ToggleButton>
        <ToggleButton id="filter-active" value="active">
          Active
        </ToggleButton>
        <ToggleButton id="filter-completed" value="completed">
          Completed
        </ToggleButton>
      </ToggleButtonGroup>

      <Button
        id="todo-clear-completed-button"
        size="small"
        variant="text"
        disabled={completedCount === 0}
        onClick={onClearCompleted}
        sx={{
          color: completedCount > 0 ? '#64748B' : '#CBD5E1',
          fontSize: '0.85rem',
          '&:hover': {
            color: '#EF4444',
            backgroundColor: 'transparent',
            textDecoration: 'underline',
          },
        }}
      >
        Clear completed
      </Button>
    </Box>
  );
};
