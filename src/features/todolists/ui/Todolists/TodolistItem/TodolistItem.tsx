import { useAppDispatch } from '@/common/hooks/useAppDispatch.ts'
import { createTaskAC } from '@/features/todolists/model/tasks-reducer.ts'
import { TodolistTitle } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx'
import { CreateItemForm } from '@/common/components'
import { Todolist } from '@/app/App.tsx'
import { FilterButtons, Tasks } from '@/features/todolists/ui/Todolists/TodolistItem'

export type FilterValues = 'all' | 'active' | 'completed'

export const TodolistItem = ({ todolist }: { todolist: Todolist }) => {
  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskAC({ todolistId: todolist.id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
