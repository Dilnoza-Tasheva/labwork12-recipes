import {type ChangeEvent, type FormEvent, useState,} from 'react';
import { createRecipe } from './recipesThunk';
import { selectCreateLoading } from './recipesSlice';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import FileInput from "../../components/UI/FileInput/FileInput.tsx";

const NewRecipe = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectCreateLoading);

    const [state, setState] = useState({ title: '', text: '', image: null as File | null });
    const [error, setError] = useState<string | null>(null);

    const change = (e: ChangeEvent<HTMLInputElement>) => setState(s => ({ ...s, [e.target.name]: e.target.value }));
    const changeFile = (e: ChangeEvent<HTMLInputElement>) => { if (e.target.files && e.target.files[0]) setState(s => ({ ...s, image: e.target.files![0] })); };

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        if (!state.title.trim() || !state.text.trim() || !state.image) { setError('Все поля обязательны'); return; }
        setError(null);
        await dispatch(createRecipe(state)).unwrap();
        navigate('/');
    };

    return (
        <Stack spacing={2} component="form" onSubmit={submit} sx={{ maxWidth: 600 }}>
            <Typography variant="h4">Новый рецепт</Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField required name="title" label="Название" value={state.title} onChange={change} />
            <TextField required name="text" label="Полный текст рецепта" value={state.text} onChange={change} multiline minRows={5} />
            <FileInput name="image" label="Картинка блюда" onChange={changeFile} />
            <Button type="submit" variant="contained" loading={loading}>Создать</Button>
        </Stack>
    );
};

export default NewRecipe;