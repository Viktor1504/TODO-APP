import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Todolist} from "@/app/App.tsx";
import {changeTodolistTitleAC, deleteTodolistAC} from "@/features/todolists/model/todolists-reducer.ts";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from './TodolistTitle.module.css'

export const TodolistTitle = ({todolist}: { todolist: Todolist }) => {

    const {id, title} = todolist

    const dispatch = useAppDispatch()

    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({id}))
    }

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
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