import { TaskPriority, TaskStatus } from '@/common/enums.ts'

export type DomainTask = {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
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
