import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button.tsx";

export const CreateItemForm = ({onCreateItem}: { onCreateItem: (title: string) => void }) => {
    const [error, setError] = useState<string | null>(null)
    const [titleValue, setTitleValue] = useState<string>('')

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitleValue(e.currentTarget.value)
    }

    const addItemHandler = () => {
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
            addItemHandler()
        }
    }

    return <div>
        <input
            className={error ? 'error' : ''}
            value={titleValue}
            onChange={changeTaskTitleHandler}
            onKeyDown={onKeyDownHandler}
        />
        <Button title={'+'} onClick={addItemHandler}/>
        {error && <div className={'error-message'}>{error}</div>}
    </div>
}