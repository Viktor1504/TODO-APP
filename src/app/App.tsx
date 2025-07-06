import './App.css'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {useAppSelector} from '@/common/hooks'
import {getTheme} from '@/common/theme'
import {Main} from '@/app/Main.tsx'
import {selectThemeMode} from '@/app/appSlice.ts'
import {ErrorSnackbar, Header} from '@/common/components'

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <div className={'app'}>
                <CssBaseline/>
                <Header/>
                <Main/>
                <ErrorSnackbar/>
            </div>
        </ThemeProvider>
    )
}
