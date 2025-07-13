import { TodolistTitle } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx'
import { CreateItemForm } from '@/common/components'
import { FilterButtons, Tasks } from '@/features/todolists/ui/Todolists/TodolistItem'
import { DomainTodolist } from '@/features/todolists/model/todolistsSlice.ts'
import { useAddTaskMutation } from '@/features/todolists/api/tasksApi.ts'

export type FilterValues = 'all' | 'active' | 'completed'

export const TodolistItem = ({ todolist }: { todolist: DomainTodolist }) => {
  const [addTask] = useAddTaskMutation()

  const createTask = (title: string) => {
    addTask({ todolistId: todolist.id, title })
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} disabled={todolist.entityStatus === 'loading'} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
