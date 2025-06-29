import { selectTasks } from '@/features/todolists/model/tasks-selectors.ts'
import { useMemo } from 'react'
import { Todolist } from '@/app/App.tsx'
import { List } from '@mui/material'
import { TaskItem } from '@/features/todolists/ui/Todolists/TodolistItem'
import { useAppSelector } from '@/common/hooks'

export const Tasks = ({ todolist }: { todolist: Todolist }) => {
  const tasks = useAppSelector(selectTasks)[todolist.id]

  const filteredTasks = useMemo(() => {
    switch (todolist.filter) {
      case 'active':
        return tasks?.filter((task) => !task.isDone) || []
      case 'completed':
        return tasks?.filter((task) => task.isDone) || []
      default:
        return tasks
    }
  }, [tasks, todolist.filter, todolist.id])

  return (
    <>
      {filteredTasks.length > 0 ? (
        <List>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} todolistId={todolist.id} />
          ))}
        </List>
      ) : (
        <p>No tasks</p>
      )}
    </>
  )
}
