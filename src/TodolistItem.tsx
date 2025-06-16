import {Button} from "./Button.tsx";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

type Props = {
    title: string
    tasks: Task[]
    date?: Date
    deleteTask: (id: number) => void
    changeFilter: (filter: FilterValues) => void
}

export const TodolistItem = ({title, tasks, date, deleteTask, changeFilter}: Props) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type={'text'}/>
                <Button title={'+'} onClick={() => {
                }}/>
            </div>
            {tasks.length === 0 ? <p>No tasks</p> :
                <ul>
                    {tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={() => deleteTask(task.id)}/></li>
                        )
                    })}
                </ul>
            }
            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>
            <div>
                <p>{date?.toLocaleDateString()}</p>
            </div>
        </div>
    )
}