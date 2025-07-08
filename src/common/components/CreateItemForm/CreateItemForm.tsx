import { ChangeEvent, KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

export const CreateItemForm = ({
  onCreateItem,
  disabled,
}: {
  onCreateItem: (title: string) => void
  disabled?: boolean
}) => {
  const [error, setError] = useState<string | null>(null)
  const [titleValue, setTitleValue] = useState<string>('')

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setTitleValue(e.currentTarget.value)
  }

  const createItemHandler = () => {
    const trimmedTitle = titleValue.trim()

    if (!trimmedTitle) {
      setError('Title cannot be empty')
      setTitleValue('')
      return
    }

    onCreateItem(trimmedTitle)
    setTitleValue('') // ✅ Очищаем поле после создания
    setError(null)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createItemHandler()
    }
  }

  return (
    <div>
      <TextField
        label={'Enter a title'}
        variant="outlined"
        value={titleValue}
        size={'small'}
        error={!!error}
        helperText={error}
        onChange={changeTaskTitleHandler}
        onKeyDown={onKeyDownHandler}
        disabled={disabled}
      />
      <IconButton color="primary" onClick={createItemHandler} disabled={disabled}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
}
