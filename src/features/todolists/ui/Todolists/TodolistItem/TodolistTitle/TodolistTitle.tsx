import { DomainTodolist } from '@/features/todolists/model/todolistsSlice.ts'
import { EditableSpan } from '@/common/components/EditableSpan/EditableSpan.tsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from './TodolistTitle.module.css'
import { useRemoveTodolistMutation, useUpdateTodolistTitleMutation } from '@/features/todolists/api/todolistsApi.ts'

export const TodolistTitle = ({ todolist }: { todolist: DomainTodolist }) => {
  const { id, title, entityStatus } = todolist

  const [removeTodolist] = useRemoveTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const deleteTodolist = () => {
    removeTodolist(id)
  }

  const changeTodolistTitle = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} disabled={entityStatus === 'loading'} />
      </h3>
      <IconButton onClick={deleteTodolist} disabled={entityStatus === 'loading'}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
