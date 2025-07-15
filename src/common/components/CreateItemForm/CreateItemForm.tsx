import { ChangeEvent, KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'
import { Box } from '@mui/material'

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
    if (error) setError(null)
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
    setTitleValue('')
    setError(null)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createItemHandler()
    }
  }

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <TextField
        label={'Enter a title'}
        variant="outlined"
        value={titleValue}
        size={'small'}
        error={!!error}
        helperText={error}
        fullWidth
        onChange={changeTaskTitleHandler}
        onKeyDown={onKeyDownHandler}
        disabled={disabled}
      />
      <IconButton color="primary" onClick={createItemHandler} disabled={disabled}>
        <AddBoxIcon />
      </IconButton>
    </Box>
  )
}
