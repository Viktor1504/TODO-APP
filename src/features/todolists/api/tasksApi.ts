import { baseApi } from '@/features/todolists/api/baseApi.ts'
import { GetTasksResponse } from '@/features/todolists/api/tasksApi.types.ts'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (id) => `todo-lists/${id}/tasks`,
    }),
  }),
})

export const { useGetTasksQuery } = tasksApi
