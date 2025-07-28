import { isFulfilled, isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { setAppErrorAC } from '@/app/appSlice.ts'
import { ResultCode } from '@/common/enums.ts'

export const errorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  let errorMessage = 'An unknown error occurred'
  if (isFulfilled(action)) {
    if ((action.payload as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
      const messages = (action.payload as { messages: string[] }).messages
      errorMessage = messages.length ? messages[0] : errorMessage
      api.dispatch(setAppErrorAC({ error: errorMessage }))
    }
  }
  if (isRejectedWithValue(action)) {
    if (action.payload) {
      if (typeof action.payload === 'string') {
        errorMessage = action.payload
      } else if (typeof action.payload === 'object' && action.payload !== null) {
        // Для стандартной структуры ошибок RTK Query
        if ('data' in action.payload && typeof action.payload.data === 'object' && action.payload.data !== null) {
          errorMessage = (action.payload.data as { message?: string }).message || errorMessage
        }
        // Для других возможных структур
        else if ('message' in action.payload && typeof action.payload.message === 'string') {
          errorMessage = action.payload.message
        } else if ('error' in action.payload && typeof action.payload.error === 'string') {
          errorMessage = action.payload.error
        }
      }
    } else if (action.error && 'message' in action.error && typeof action.error.message === 'string') {
      errorMessage = action.error.message
    }

    api.dispatch(setAppErrorAC({ error: errorMessage }))

    console.error('API Error:', errorMessage)
  }

  return next(action)
}
