import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from "../../axiosApi.ts";
import type { Comment } from "../../types";

export const fetchComments = createAsyncThunk<Comment[], string>('comments/fetchByRecipe', async (recipeId) => {
    const { data } = await axiosApi.get<Comment[]>('/comments', { params: { recipe: recipeId } });
    return data;
});

export const createComment = createAsyncThunk<void, { recipe: string; text: string }>('comments/create', async (payload) => {
    await axiosApi.post('/comments', payload);
});

export const deleteComment = createAsyncThunk<void, string>('comments/delete', async (id) => {
    await axiosApi.delete(`/comments/${id}`);
});