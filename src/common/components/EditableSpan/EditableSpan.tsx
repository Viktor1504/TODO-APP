import { ChangeEvent, useState } from 'react'
import TextField from '@mui/material/TextField'

export const EditableSpan = ({ value, onChange }: { value: string; onChange: (title: string) => void }) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const turnOnEditMode = () => {
    setIsEditMode(true)
  }

  const turnOffEditMode = () => {
    setIsEditMode(false)
    onChange(title)
  }

  return (
    <>
      {isEditMode ? (
        <TextField
          label={'Change title'}
          variant={'outlined'}
          value={title}
          size={'small'}
          onChange={changeTitle}
          onBlur={turnOffEditMode}
          autoFocus
        />
      ) : (
        <span onDoubleClick={turnOnEditMode}>{value}</span>
      )}
    </>
  )
}
