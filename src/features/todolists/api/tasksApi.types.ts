import { TaskPriority, TaskStatus } from '@/common/enums.ts'
import { z } from 'zod/v4'

export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  title: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  startDate: z.string().nullable(),
  deadline: z.string().nullable(),
  id: z.string(),
  todoListId: z.string(),
  order: z.int(),
  addedDate: z.iso.datetime({ local: true }),
})

export type DomainTask = z.infer<typeof domainTaskSchema>
export type UpdateTaskModel = Omit<DomainTask, 'id' | 'todoListId' | 'order' | 'addedDate'>

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}
