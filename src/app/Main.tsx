import {createTodolistAC} from "@/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {CreateItemForm} from "@/CreateItemForm.tsx";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import {Todolists} from "@/Todolists.tsx";

export const Main = () => {
    const dispatch = useAppDispatch()

    const createTodolist = (title: string) => {
        dispatch(createTodolistAC(title))
    }

    return <Container maxWidth={'lg'}>
        <Grid container sx={{mb: '30px'}}>
            <CreateItemForm onCreateItem={createTodolist}/>
        </Grid>
        <Grid container spacing={4}>
            <Todolists/>
        </Grid>
    </Container>
}