import { baseApi } from '@/features/todolists/api/baseApi.ts'
import { DomainTask, GetTasksResponse, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types.ts'
import { BaseResponse } from '@/common/types'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (id) => `todo-lists/${id}/tasks`,
      providesTags: ['Task'],
    }),
    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
    addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      {
        todolistId: string
        taskId: string
        model: UpdateTaskModel
      }
    >({
      query: ({ todolistId, taskId, model }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'PUT',
        body: model,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
})

export const { useGetTasksQuery, useRemoveTaskMutation, useAddTaskMutation, useUpdateTaskMutation } = tasksApi
