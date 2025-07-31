import { baseApi } from '@/features/todolists/api/baseApi.ts'
import { DomainTask, GetTasksResponse, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types.ts'
import { BaseResponse } from '@/common/types'
import { PAGE_SIZE } from '@/common/constants'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string; params: { page: number } }>({
      query: ({ todolistId, params }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        params: { ...params, count: PAGE_SIZE },
      }),
      providesTags: (_result, _error, { todolistId }) => [{ type: 'Task', id: todolistId }],
    }),
    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: 'Task', id: todolistId }],
    }),
    addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body: { title },
      }),
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: 'Task', id: todolistId }],
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
      invalidatesTags: (_result, _error, { todolistId }) => [{ type: 'Task', id: todolistId }],
    }),
  }),
})

export const { useGetTasksQuery, useRemoveTaskMutation, useAddTaskMutation, useUpdateTaskMutation } = tasksApi
