import { createAsyncThunk } from '@reduxjs/toolkit';
import type {Recipe, RecipeMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchRecipes = createAsyncThunk<Recipe[]>('recipes/fetchAll', async () => {
    const { data } = await axiosApi.get<Recipe[]>('/recipes');
    return data;
});

export const fetchRecipesByUser = createAsyncThunk<Recipe[], string>('recipes/fetchByUser', async (userId) => {
    const { data } = await axiosApi.get<Recipe[]>(`/recipes/by-user/${userId}`);
    return data;
});

export const fetchOneRecipe = createAsyncThunk<Recipe, string>('recipes/fetchOne', async (id) => {
    const { data } = await axiosApi.get<Recipe>(`/recipes/${id}`);
    return data;
});

export const createRecipe = createAsyncThunk<void, RecipeMutation>('recipes/create', async (payload) => {
    const form = new FormData();
    form.append('title', payload.title);
    form.append('text', payload.text);
    if (payload.image) form.append('image', payload.image);
    await axiosApi.post('/recipes', form);
});


export const deleteRecipe = createAsyncThunk<void, string>('recipes/delete', async (id) => {
    await axiosApi.delete(`/recipes/${id}`);
});