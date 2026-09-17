import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import { CheckCircle2 } from 'lucide-react';

interface TodoStatsProps {
  total: number;
  completed: number;
}

export const TodoStats: React.FC<TodoStatsProps> = ({ total, completed }) => {
  if (total === 0) return null;

  const percentage = Math.round((completed / total) * 100);

  return (
    <Box id="todo-stats-section" sx={{ width: '100%', mb: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography
          id="todo-progress-label"
          variant="body2"
          sx={{ fontWeight: 600, color: '#334155' }}
        >
          Task Progress
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            {completed} of {total} completed
          </Typography>
          {percentage === 100 && (
            <Chip
              id="all-done-chip"
              size="small"
              icon={<CheckCircle2 size={14} color="#16A34A" />}
              label="All Done!"
              sx={{
                backgroundColor: '#DCFCE7',
                color: '#15803D',
                fontWeight: 600,
                height: 24,
              }}
            />
          )}
        </Box>
      </Box>
      <LinearProgress
        id="todo-linear-progress"
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: '#E2E8F0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: percentage === 100 ? '#16A34A' : '#2563EB',
            borderRadius: 4,
            transition: 'transform 0.3s ease',
          },
        }}
      />
    </Box>
  );
};
