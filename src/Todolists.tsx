import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolists-selectors.ts";
import {TodolistItem} from "@/TodolistItem.tsx";
import {Grid, Paper} from "@mui/material";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists.map((todolist) => (
                <Grid key={todolist.id}>
                    <Paper elevation={3} sx={{p: '0 20px 20px 20px'}}>
                        <TodolistItem todolist={todolist}/>
                    </Paper>
                </Grid>
            ))
            }
        </>
    );
};

