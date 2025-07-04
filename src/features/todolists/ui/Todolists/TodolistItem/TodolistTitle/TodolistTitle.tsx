import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts'
import {changeTodolistTitleTC, deleteTodolistTC} from '@/features/todolists/model/todolistsSlice.ts'
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan.tsx'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import styles from './TodolistTitle.module.css'
import {Todolist} from '@/features/todolists/api/todolistsApi.types.ts'

export const TodolistTitle = ({todolist}: { todolist: Todolist }) => {
    const {id, title} = todolist

    const dispatch = useAppDispatch()

    const deleteTodolist = () => {
        dispatch(deleteTodolistTC(id))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleTC({id, title}))
    }

    return (
        <div className={styles.container}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle}/>
            </h3>
            <IconButton onClick={deleteTodolist}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}
