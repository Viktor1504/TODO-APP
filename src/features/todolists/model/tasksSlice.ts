import { createTodolistTC, deleteTodolistTC } from '@/features/todolists/model/todolistsSlice.ts'
import { createAppSlice, handleServerAppError, handleServerNetworkError } from '@/common/utils'
import { tasksApi } from '@/features/todolists/api/tasksApi.ts'
import { domainTaskSchema, TasksState, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types.ts'
import { RootState } from '@/app/store.ts'
import { setAppStatus } from '@/app/appSlice.ts'
import { ResultCode } from '@/common/enums.ts'

export const tasksSlice = createAppSlice({
  name: 'tasks',
  initialState: {} as TasksState,
  reducers: (create) => ({
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatus({ status: 'loading' }))
          const res = await tasksApi.getTasks(todolistId)
          domainTaskSchema.array().parse(res.data.items)
          dispatch(setAppStatus({ status: 'succeeded' }))
          return { todolistId, tasks: res.data.items }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    deleteTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; taskId: string }, { dispatch, rejectWithValue }) => {
        const { todolistId, taskId } = payload
        try {
          dispatch(setAppStatus({ status: 'loading' }))
          const res = await tasksApi.deleteTask(todolistId, taskId)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatus({ status: 'succeeded' }))
            return payload
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId)
          if (index !== -1) {
            state[action.payload.todolistId].splice(index, 1)
          }
        },
      },
    ),
    updateTaskTC: create.asyncThunk(
      async (
        payload: {
          todolistId: string
          taskId: string
          domainModel: Partial<UpdateTaskModel>
        },
        { dispatch, rejectWithValue, getState },
      ) => {
        const { todolistId, taskId, domainModel } = payload
        const allTodolistTasks = (getState() as RootState).tasks[todolistId]
        const task = allTodolistTasks.find((t) => t.id === taskId)
        if (!task) {
          return rejectWithValue(null)
        }
        const model: UpdateTaskModel = {
          status: domainModel.status ?? task.status,
          title: domainModel.title ?? task.title,
          description: task.description,
          priority: task.priority,
          startDate: task.startDate,
          deadline: task.deadline,
        }
        try {
          dispatch(setAppStatus({ status: 'loading' }))
          const res = await tasksApi.updateTask({ todolistId, taskId, model })
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatus({ status: 'succeeded' }))
            return { task: res.data.data.item }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const { task } = action.payload
          const todolistId = task.todoListId
          const index = state[todolistId].findIndex((t) => t.id === task.id)
          if (index !== -1) {
            state[todolistId][index] = task
          }
        },
      },
    ),
    createTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
        const { todolistId, title } = payload
        try {
          dispatch(setAppStatus({ status: 'loading' }))
          const res = await tasksApi.createTask(todolistId, title)
          if (res.data.resultCode === ResultCode.Success) {
            dispatch(setAppStatus({ status: 'succeeded' }))
            return { task: res.data.data.item }
          } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
          }
        } catch (error) {
          handleServerNetworkError(error, dispatch)
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const { task } = action.payload
          const { todoListId } = task
          state[todoListId].unshift(task)
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder.addCase(createTodolistTC.fulfilled, (state, action) => {
      state[action.payload.todolist.id] = []
    })
    builder.addCase(deleteTodolistTC.fulfilled, (state, action) => {
      delete state[action.payload.id]
    })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const { fetchTasksTC, createTaskTC, deleteTaskTC, updateTaskTC } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors
