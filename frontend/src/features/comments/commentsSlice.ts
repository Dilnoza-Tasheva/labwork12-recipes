import { createSlice } from '@reduxjs/toolkit';
import type { Comment } from "../../types";
import { fetchComments, createComment, deleteComment } from './commentsThunk';

interface CommentsState {
    items: Comment[];
    loading: boolean;
    creating: boolean;
    deleting: boolean;
}

const initialState: CommentsState = {
    items: [],
    loading: false,
    creating: false,
    deleting: false,
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchComments.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.items = payload;
            })
            .addCase(fetchComments.rejected, (state) => {
                state.loading = false;
            });
        builder
            .addCase(createComment.pending, (state) => {
                state.creating = true;
            })
            .addCase(createComment.fulfilled, (state) => {
                state.creating = false;
            })
            .addCase(createComment.rejected, (state) => {
                state.creating = false;
            });
        builder
            .addCase(deleteComment.pending, (state) => {
                state.deleting = true;
            })
            .addCase(deleteComment.fulfilled, (state) => {
                state.deleting = false;
            })
            .addCase(deleteComment.rejected, (state) => {
                state.deleting = false;
            });
    },
    selectors: {
        selectComments: (state) => state.items,
        selectCommentsLoading: (state) => state.loading,
        selectCommentCreating: (state) => state.creating,
        selectCommentDeleting: (state) => state.deleting,
    },
});

export const commentsReducer = commentsSlice.reducer;
export const {selectComments, selectCommentsLoading, selectCommentCreating, selectCommentDeleting,} = commentsSlice.selectors;
