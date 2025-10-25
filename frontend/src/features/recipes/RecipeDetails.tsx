import { type FormEvent, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    IconButton,
    Stack,
    TextField,
    Typography,
    Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchOneRecipe } from './recipesThunk';
import { selectCurrentLoading, selectCurrentRecipe } from './recipesSlice';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../users/usersSlice.ts";
import {createComment, deleteComment, fetchComments} from "../comments/commentsThunk.ts";
import {API_URL} from "../../constants.ts";

const RecipeDetails = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const recipe = useAppSelector(selectCurrentRecipe);
    const recipeLoading = useAppSelector(selectCurrentLoading);
    const comments = useAppSelector((s) => s.comments.items);
    const commentsLoading = useAppSelector((s) => s.comments.loading);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        dispatch(fetchOneRecipe(id));
        dispatch(fetchComments(id));
    }, [dispatch, id]);

    const canDeleteComment = (commentUserId: string, recipeUserId: string) =>
        user && (user._id === commentUserId || user._id === recipeUserId);

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const text = String(form.get('text') || '');
        if (!text.trim()) return;
        await dispatch(createComment({ recipe: id, text })).unwrap();
        e.currentTarget.reset();
        dispatch(fetchComments(id));
    };

    if (recipeLoading) return <CircularProgress />;
    if (!recipe) return <Alert severity="error">Рецепт не найден.</Alert>;

    const img = recipe.image ? `${API_URL}/${recipe.image}` : '';

    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Typography variant="h3">{recipe.title}</Typography>
                <Typography
                    variant="body2"
                    component={RouterLink}
                    to={`/authors/${recipe.user._id}`}
                    style={{ textDecoration: 'none' }}
                >
                    {recipe.user.displayName}
                </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Card>{img && <CardMedia sx={{ height: 360 }} image={img} />}</Card>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                    <CardContent>
                        <Typography whiteSpace="pre-wrap">{recipe.text}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid size={12}>
                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                    Комментарии
                </Typography>
                {commentsLoading ? (
                    <CircularProgress />
                ) : (
                    <Stack spacing={1}>
                        {comments.map((c) => (
                            <Card key={c._id}>
                                <CardContent>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Box>
                                            <Typography variant="subtitle2">{c.user.displayName}</Typography>
                                            <Typography>{c.text}</Typography>
                                        </Box>
                                        {canDeleteComment(c.user._id, recipe.user._id) && (
                                            <IconButton
                                                onClick={async () => {
                                                    await dispatch(deleteComment(c._id)).unwrap();
                                                    dispatch(fetchComments(id));
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        )}
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                )}
            </Grid>

            {user && (
                <Grid size={12}>
                    <form onSubmit={submit}>
                        <Stack direction="row" gap={1}>
                            <TextField name="text" label="Оставьте комментарий" fullWidth required />
                            <Button type="submit" variant="contained">
                                Отправить
                            </Button>
                        </Stack>
                    </form>
                </Grid>
            )}
        </Grid>
    );
};

export default RecipeDetails;
