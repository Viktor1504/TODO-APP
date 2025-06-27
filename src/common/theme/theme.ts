import {createTheme} from '@mui/material/styles'
import {ThemeMode} from "@/model/app-reducer.ts";

export const getTheme = (themeMode: ThemeMode) => {
    return createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4',
            },
        },
    })
}