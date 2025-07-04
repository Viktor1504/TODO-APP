import {TaskPriority, TaskStatus} from '@/common/enums.ts'

export type DomainTask = {
    id: string
    title: string
    status: TaskStatus
    description: string
    priority: TaskPriority
    startDate: string
    deadline: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}

export type UpdateTaskModel = Omit<DomainTask, 'id' | 'todoListId' | 'order' | 'addedDate'>

export type TasksState = Record<string, DomainTask[]>