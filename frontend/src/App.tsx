import { Route, Routes } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import AppToolbar from "./components/UI/AppToolBar/AppToolBar.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/users/usersSlice.ts";
import RecipesList from "./features/recipes/RecipesList.tsx";
import ProtectedRoute from "./components/UI/ProtectedRoute/ProtectedRoute.tsx";
import NewRecipe from "./features/recipes/NewRecipe.tsx";

const App = () => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <header><AppToolbar /></header>
            <Container maxWidth="xl" component="main">
                <Routes>
                    <Route path="/" element={<RecipesList />} />
                    <Route path="/recipes/new" element={<ProtectedRoute isAllowed={Boolean(user)}><NewRecipe /></ProtectedRoute>} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Typography>Not found</Typography>} />
                </Routes>
            </Container>
        </>
    );
};

export default App;