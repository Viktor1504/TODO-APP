import {createTodolistTC, deleteTodolistTC} from '@/features/todolists/model/todolistsSlice.ts'
import {createAppSlice} from "@/common/utils";
import {tasksApi} from "@/features/todolists/api/tasksApi.ts";
import {DomainTask, TasksState} from "@/features/todolists/api/tasksApi.types.ts";
import {TaskPriority, TaskStatus} from "@/common/enums.ts";
import {nanoid} from "@reduxjs/toolkit";

export const tasksSlice = createAppSlice({
    name: 'tasks',
    initialState: {} as TasksState,
    reducers: (create) => ({
        fetchTasksTC: create.asyncThunk(
            async (todolistId: string, {rejectWithValue}) => {
                try {
                    const res = await tasksApi.getTasks(todolistId)
                    return {todolistId, tasks: res.data.items}
                } catch (error) {
                    return rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, action) => {
                    state[action.payload.todolistId] = action.payload.tasks
                }
            }
        ),
        deleteTaskTC: create.asyncThunk(
            async (payload: { todolistId: string, taskId: string }, {rejectWithValue}) => {
                const {todolistId, taskId} = payload
                try {
                    await tasksApi.deleteTask(todolistId, taskId)
                    return payload
                } catch (error) {
                    return rejectWithValue(error)
                }
            },
            {
                fulfilled: (state, action) => {
                    const index = state[action.payload.todolistId].findIndex((t) => t.id === action.payload.taskId)
                    if (index !== -1) {
                        state[action.payload.todolistId].splice(index, 1)
                    }
                }
            }
        ),
        createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
            const newTask: DomainTask = {
                title: action.payload.title,
                todoListId: action.payload.todolistId,
                startDate: '',
                priority: TaskPriority.Low,
                description: '',
                deadline: '',
                status: TaskStatus.New,
                addedDate: '',
                order: 0,
                id: nanoid(),
            }
            state[action.payload.todolistId].unshift(newTask)
        }),
        changeTaskAC: create.reducer<{
            todolistId: string
            taskId: string
            updateFields: { title?: string; status?: TaskStatus }
        }>((state, action) => {
            const task = state[action.payload.todolistId].find((t) => t.id === action.payload.taskId)
            if (task) {
                Object.assign(task, action.payload.updateFields)
            }
        }),
    }),
    extraReducers: (builder) => {
        builder.addCase(createTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(deleteTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload]
        })
    },
    selectors: {
        selectTasks: (state) => state,
    },
})

export const {fetchTasksTC, createTaskAC, deleteTaskTC, changeTaskAC} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const {selectTasks} = tasksSlice.selectors
