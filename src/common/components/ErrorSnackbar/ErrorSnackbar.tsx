import {SyntheticEvent} from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import {useAppSelector, useAppDispatch} from "@/common/hooks";
import {selectAppError, setAppErrorAC} from "@/app/appSlice.ts";

export const ErrorSnackbar = () => {
    const error = useAppSelector(selectAppError)
    const dispatch = useAppDispatch()
    const isOpen = !!error

    const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC({error: null}))
    }

    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" variant="filled" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}