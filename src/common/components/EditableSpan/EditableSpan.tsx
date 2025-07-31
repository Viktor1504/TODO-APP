import { ChangeEvent, KeyboardEvent, useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import { Typography, TypographyProps } from '@mui/material'

type EditableSpanProps = {
  value: string
  onValueChange: (title: string) => void
  disabled?: boolean
} & TypographyProps

export const EditableSpan = ({ value, onValueChange, disabled, ...typographyProps }: EditableSpanProps) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  // Синхронизируем локальное состояние при изменении value извне
  useEffect(() => {
    setTitle(value)
  }, [value])

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const enableEditMode = () => {
    if (disabled) return
    setIsEditMode(true)
  }

  const disableEditMode = () => {
    setIsEditMode(false)
    if (title !== value) {
      onValueChange(title)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      disableEditMode()
    }
  }

  return isEditMode ? (
    <TextField
      label="Change title"
      variant="outlined"
      value={title}
      size="small"
      onChange={handleTitleChange}
      onBlur={disableEditMode}
      onKeyDown={handleKeyDown}
      autoFocus
      fullWidth
    />
  ) : (
    <Typography
      {...typographyProps}
      onDoubleClick={enableEditMode}
      sx={{
        cursor: disabled ? 'default' : 'pointer',
        ...typographyProps.sx,
      }}
    >
      {value}
    </Typography>
  )
}
