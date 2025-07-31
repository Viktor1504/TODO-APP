import { useMemo, useState } from 'react'
import { List } from '@mui/material'
import { TaskItem } from '@/features/todolists/ui/Todolists/TodolistItem'
import { TaskStatus } from '@/common/enums.ts'
import { useGetTasksQuery } from '@/features/todolists/api/tasksApi.ts'
import { TasksSkeleton } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton.tsx'
import { DomainTodolist } from '@/features/todolists/lib/types'
import { TasksPagination } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksPagination/TasksPagination.tsx'

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

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {filteredTaskList?.length > 0 ? (
        <>
          <List>
            {filteredTaskList.map((task) => (
              <TaskItem key={task.id} task={task} todolist={todolist} />
            ))}
          </List>
          <TasksPagination page={page} setPage={setPage} totalCount={tasks?.totalCount || 0} />
        </>
      ) : (
        <p>No tasks</p>
      )}
    </>
  )
}
