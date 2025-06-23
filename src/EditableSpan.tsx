import {ChangeEvent, useState} from "react";

export const EditableSpan = ({value, onChange}: { value: string, onChange: (title: string) => void }) => {
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
                <input value={title} onChange={changeTitle} onBlur={turnOffEditMode} autoFocus/>
            ) : (
                <span onDoubleClick={turnOnEditMode}>{value}</span>
            )}
        </>
    )
}