import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/features/todolists/model/todolists-selectors.ts";
import {Grid, Paper} from "@mui/material";
import {TodolistItem} from "@/features/todolists/ui/Todolists/TodolistItem";

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

