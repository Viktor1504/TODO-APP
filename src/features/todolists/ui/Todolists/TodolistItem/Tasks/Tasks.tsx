import { useEffect, useMemo, useState } from 'react'
import { Box, List, Typography } from '@mui/material'
import { TaskItem } from '@/features/todolists/ui/Todolists/TodolistItem'
import { TaskStatus } from '@/common/enums.ts'
import { useGetTasksQuery } from '@/features/todolists/api/tasksApi.ts'
import { TasksSkeleton } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx'
import { DomainTodolist } from '@/features/todolists/lib/types'
import { TasksPagination } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksPagination/TasksPagination.tsx'
import { tasksSxProps } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.SxProps.ts'

export const Tasks = ({ todolist }: { todolist: DomainTodolist }) => {
  const { id, filter } = todolist

  const [page, setPage] = useState(1)

  const { data: tasks, isLoading } = useGetTasksQuery({ todolistId: id, params: { page } })

  const filteredTaskList = useMemo(() => {
    const items = tasks?.items ?? []
    switch (filter) {
      case 'active':
        return items.filter((task) => task.status === TaskStatus.New)
      case 'completed':
        return items.filter((task) => task.status === TaskStatus.Completed)
      default:
        return items
    }
  }, [tasks?.items, filter])

  useEffect(() => {
    if (tasks && !isLoading) {
      // Если на странице нет задач, но общее количество больше 0, и мы не на первой странице
      if (filteredTaskList.length === 0 && (tasks.totalCount || 0) > 0 && page > 1) {
        setPage((prev) => prev - 1)
      }
    }
  }, [tasks?.totalCount, filteredTaskList.length, page, isLoading])

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {filteredTaskList?.length > 0 ? (
        <>
          <Box sx={tasksSxProps.taskCounter} mb={1}>
            Total: {tasks?.totalCount || 0}
          </Box>
          <List sx={tasksSxProps.tasksList}>
            {filteredTaskList.map((task) => (
              <TaskItem key={task.id} task={task} todolist={todolist} />
            ))}
          </List>
          <Box sx={tasksSxProps.pagination}>
            <TasksPagination page={page} setPage={setPage} totalCount={tasks?.totalCount || 0} />
          </Box>
        </>
      ) : (
        <Typography sx={tasksSxProps.noTasksMessage}>No tasks</Typography>
      )}
    </>
  )
}
