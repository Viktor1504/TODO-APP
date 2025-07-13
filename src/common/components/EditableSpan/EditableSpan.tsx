import { ChangeEvent, KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'

export const EditableSpan = ({
  value,
  onChange,
  disabled,
}: {
  value: string
  onChange: (title: string) => void
  disabled: boolean
}) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const enableEditMode = () => {
    if (disabled) return
    setIsEditMode(true)
  }

  const disableEditMode = () => {
    setIsEditMode(false)
    onChange(title)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      disableEditMode()
    }
  }

  return (
    <>
      {isEditMode ? (
        <TextField
          label={'Change title'}
          variant={'outlined'}
          value={title}
          size={'small'}
          onChange={handleTitleChange}
          onBlur={disableEditMode}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <Typography sx={{ display: 'inline-block' }} onDoubleClick={enableEditMode}>
          {value}
        </Typography>
      )}
    </>
  )
}
