import {Button} from "./Button.tsx";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

type Props = {
    title: string
    tasks: Task[]
    date?: Date
}

export const TodolistItem = ({title, tasks, date}: Props) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type={'text'}/>
                <Button title={'+'}/>
            </div>
            {tasks.length === 0 ? <p>No tasks</p> :
                <ul>
                    {tasks.map((task) => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                            </li>
                        )
                    })}
                </ul>
            }
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
            <div>
                <p>{date?.toLocaleDateString()}</p>
            </div>
        </div>
    )
}