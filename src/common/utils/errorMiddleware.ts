import { isFulfilled, isRejectedWithValue, Middleware, MiddlewareAPI, SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { setAppErrorAC } from '@/app/appSlice.ts'
import { ResultCode } from '@/common/enums.ts'

// Type guards для безопасной проверки типов
const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === 'object' && error != null && 'status' in error
}

const isSerializedError = (error: unknown): error is SerializedError => {
  return typeof error === 'object' && error != null && 'message' in error
}

const getErrorMessage = (error: unknown): string => {
  if (isFetchBaseQueryError(error)) {
    if (error.data && typeof error.data === 'object') {
      const data = error.data as { message?: string }
      return data.message || `Request failed with status ${error.status}`
    }
    return `Request failed with status ${error.status}`
  }

  if (isSerializedError(error)) {
    return error.message || 'An unknown error occurred'
  }

  return 'An unknown error occurred'
}

export const errorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isFulfilled(action)) {
    const payload = action.payload as { resultCode?: ResultCode; messages?: string[] }

    if (payload?.resultCode === ResultCode.Error) {
      const errorMessage = payload.messages?.[0] || 'Operation failed'
      api.dispatch(setAppErrorAC({ error: errorMessage }))
    }
  }

  if (isRejectedWithValue(action)) {
    const errorMessage = getErrorMessage(action.payload)

    api.dispatch(setAppErrorAC({ error: errorMessage }))
    console.error('RTK Query Error:', errorMessage, action.payload)
  }

  return next(action)
}
