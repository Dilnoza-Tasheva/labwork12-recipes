import { useEffect } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { deleteRecipe, fetchRecipesByUser } from './recipesThunk';
import { selectByUser, selectByUserLoading } from './recipesSlice';
import { Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../users/usersSlice.ts";
import {API_URL} from "../../constants.ts";

const AuthorRecipes = () => {
    const { userId } = useParams() as { userId: string };
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const items = useAppSelector(selectByUser);
    const loading = useAppSelector(selectByUserLoading);
    const me = useAppSelector(selectUser);

    const isOwner = me?._id === userId;
    useEffect(() => { dispatch(fetchRecipesByUser(userId)); }, [dispatch, userId]);
    if (loading) return <CircularProgress />;

    return (
        <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Рецепты автора</Typography>
                {isOwner && <Button variant="contained" onClick={() => navigate('/recipes/new')}>Создать новый рецепт</Button>}
            </Stack>


            <Grid container spacing={2}>
                {items.map((r) => {
                    const img = r.image ? `${API_URL}/${r.image}` : '';
                    return (
                        <Grid key={r._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Card>
                                <CardActionArea component={RouterLink} to={`/recipes/${r._id}`}>
                                    {img && <CardMedia sx={{ height: 180 }} image={img} />}
                                    <CardContent>
                                        <Typography variant="h6">{r.title}</Typography>
                                    </CardContent>
                                </CardActionArea>
                                {isOwner && (
                                    <Stack direction="row" justifyContent="flex-end" p={1}>
                                        <Button color="error" onClick={async () => { await dispatch(deleteRecipe(r._id)).unwrap(); dispatch(fetchRecipesByUser(userId)); }}>
                                            Удалить
                                        </Button>
                                    </Stack>
                                )}
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Stack>
    );
};

export default AuthorRecipes;