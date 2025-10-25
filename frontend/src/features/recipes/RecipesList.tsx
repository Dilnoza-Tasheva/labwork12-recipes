import { useEffect } from 'react';
import { fetchRecipes } from './recipesThunk';
import { selectRecipes, selectRecipesLoading } from './recipesSlice';
import { Alert, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {API_URL} from "../../constants.ts";

const RecipesList = () => {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectRecipes);
    const loading = useAppSelector(selectRecipesLoading);

    useEffect(() => { dispatch(fetchRecipes()); }, [dispatch]);

    if (loading) return <CircularProgress />;
    if (!items.length) return <Alert severity="info">Пока нет рецептов.</Alert>;

    return (
        <Grid container spacing={2}>
            {items.map((r) => {
                const img = r.image ? `${API_URL}/${r.image}` : '';
                return (
                    <Grid item key={r._id} xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardActionArea component={Link} to={`/recipes/${r._id}`}>
                                {img && <CardMedia sx={{ height: 180 }} image={img} />}
                                <CardContent>
                                    <Stack spacing={1}>
                                        <Typography variant="h6">{r.title}</Typography>
                                        <Typography variant="body2" component={Link} to={`/authors/${r.user._id}`} style={{ textDecoration: 'none' }}>
                                            {r.user.displayName}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default RecipesList;