import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipes, fetchRecipesByUser, fetchOneRecipe, createRecipe, deleteRecipe,} from './recipesThunk';
import type {Recipe} from "../../types";

interface RecipesState {
    items: Recipe[];
    byUser: Recipe[];
    current: Recipe | null;
    listLoading: boolean;
    byUserLoading: boolean;
    currentLoading: boolean;
    createLoading: boolean;
    deleting: boolean;
}

const initialState: RecipesState = {
    items: [],
    byUser: [],
    current: null,
    listLoading: false,
    byUserLoading: false,
    currentLoading: false,
    createLoading: false,
    deleting: false,
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.listLoading = true;
            })
            .addCase(fetchRecipes.fulfilled, (state, { payload }) => {
                state.listLoading = false;
                state.items = payload;
            })
            .addCase(fetchRecipes.rejected, (state) => {
                state.listLoading = false;
            });
        builder
            .addCase(fetchRecipesByUser.pending, (state) => {
                state.byUserLoading = true;
            })
            .addCase(fetchRecipesByUser.fulfilled, (state, { payload }) => {
                state.byUserLoading = false;
                state.byUser = payload;
            })
            .addCase(fetchRecipesByUser.rejected, (state) => {
                state.byUserLoading = false;
            });
        builder
            .addCase(fetchOneRecipe.pending, (state) => {
                state.currentLoading = true;
                state.current = null;
            })
            .addCase(fetchOneRecipe.fulfilled, (state, { payload }) => {
                state.currentLoading = false;
                state.current = payload;
            })
            .addCase(fetchOneRecipe.rejected, (state) => {
                state.currentLoading = false;
            });
        builder
            .addCase(createRecipe.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createRecipe.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createRecipe.rejected, (state) => {
                state.createLoading = false;
            });
        builder
            .addCase(deleteRecipe.pending, (state) => {
                state.deleting = true;
            })
            .addCase(deleteRecipe.fulfilled, (state) => {
                state.deleting = false;
            })
            .addCase(deleteRecipe.rejected, (state) => {
                state.deleting = false;
            });
    },
    selectors: {
        selectRecipes: (state) => state.items,
        selectRecipesLoading: (state) => state.listLoading,
        selectByUser: (state) => state.byUser,
        selectByUserLoading: (state) => state.byUserLoading,
        selectCurrentRecipe: (state) => state.current,
        selectCurrentLoading: (state) => state.currentLoading,
        selectCreateLoading: (state) => state.createLoading,
        selectDeleting: (state) => state.deleting,
    },
});

export const recipesReducer = recipesSlice.reducer;
export const { selectRecipes, selectRecipesLoading, selectByUser, selectByUserLoading, selectCurrentRecipe, selectCurrentLoading, selectCreateLoading } = recipesSlice.selectors;