import { containerSx } from '@/common/styles'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'

export const TodolistSkeleton = () => (
  <Paper
    sx={{
      borderRadius: 4,
      p: 3,
    }}
  >
    {/* Title Section */}
    <Box display="flex" alignItems="center" gap={'15px'}>
      <Skeleton width={150} height={50} />
      <Skeleton width={20} height={40} />
    </Box>
    {/*!* Create Item Form Section *!*/}
    <Box display="flex" justifyContent="space-between" alignItems="center" gap="15px">
      <Skeleton width={230} height={60} />
      <Skeleton width={20} height={40} />
    </Box>
    {/*!* Tasks List *!*/}
    <Box style={{ padding: '8px 0' }}>
      {Array(4)
        .fill(null)
        .map((_, id) => (
          <Box key={id} sx={containerSx}>
            <Box sx={containerSx} style={{ gap: '15px' }}>
              <Skeleton width={20} height={40} />
              <Skeleton width={150} height={40} />
            </Box>
            <Skeleton width={20} height={40} />
          </Box>
        ))}
    </Box>
    {/*!* Filter or Action Buttons *!*/}
    <Box sx={containerSx}>
      {Array(3)
        .fill(null)
        .map((_, id) => (
          <Skeleton key={id} width={80} height={60} />
        ))}
    </Box>
  </Paper>
)
