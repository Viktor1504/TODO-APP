import {useEffect, useMemo} from 'react'
import {List} from '@mui/material'
import {TaskItem} from '@/features/todolists/ui/Todolists/TodolistItem'
import {useAppDispatch, useAppSelector} from '@/common/hooks'
import {DomainTodolist} from '@/features/todolists/model/todolistsSlice.ts'
import {fetchTasksTC, selectTasks} from '@/features/todolists/model/tasksSlice.ts'
import {TaskStatus} from "@/common/enums.ts";

export const Tasks = ({todolist}: { todolist: DomainTodolist }) => {
    const {id, filter} = todolist

    const dispatch = useAppDispatch()

    const tasks = useAppSelector(selectTasks)[id]

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [id]);

    const filteredTasks = useMemo(() => {
        if (!tasks) return []
        switch (filter) {
            case 'active':
                return tasks.filter((task) => task.status === TaskStatus.New)
            case 'completed':
                return tasks.filter((task) => task.status === TaskStatus.Completed)
            default:
                return tasks
        }
    }, [tasks, filter]);

    return (
        <>
            {filteredTasks?.length > 0 ? (
                <List>
                    {filteredTasks.map((task) => (
                        <TaskItem key={task.id} task={task} todolistId={id}/>
                    ))}
                </List>
            ) : (
                <p>No tasks</p>
            )}
        </>
    )
}
