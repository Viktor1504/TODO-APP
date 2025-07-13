import { useMemo } from 'react'
import { List } from '@mui/material'
import { TaskItem } from '@/features/todolists/ui/Todolists/TodolistItem'
import { DomainTodolist } from '@/features/todolists/model/todolistsSlice.ts'
import { TaskStatus } from '@/common/enums.ts'
import { useGetTasksQuery } from '@/features/todolists/api/tasksApi.ts'

export const Tasks = ({ todolist }: { todolist: DomainTodolist }) => {
  const { id, filter } = todolist

  const { data: tasks } = useGetTasksQuery(id)

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

  return (
    <>
      {filteredTaskList?.length > 0 ? (
        <List>
          {filteredTaskList.map((task) => (
            <TaskItem key={task.id} task={task} todolistId={id} todolist={todolist} />
          ))}
        </List>
      ) : (
        <p>No tasks</p>
      )}
    </>
  )
}
