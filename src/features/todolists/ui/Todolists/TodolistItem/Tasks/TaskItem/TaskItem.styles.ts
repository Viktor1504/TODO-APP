import { SxProps } from '@mui/material/'
import { TaskStatus } from '@/common/enums.ts'

export const getListItemSx = (taskStatus: TaskStatus): SxProps => ({
  p: 0,
  justifyContent: 'space-between',
  opacity: taskStatus === TaskStatus.Completed ? 0.5 : 1,
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
})
