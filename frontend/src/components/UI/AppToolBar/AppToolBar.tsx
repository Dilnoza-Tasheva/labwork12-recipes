import { AppBar, Toolbar, Typography, Box, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import AnonymousMenu from './AnonymousMenu';
import UserMenu from './UserMenu';
import {useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../../../features/users/usersSlice.ts";

const AppToolbar = () => {
    const user = useAppSelector(selectUser);
    const StyledLink = styled(Link)({ color: 'inherit', textDecoration: 'none', '&:hover': { color: 'inherit' } });


    return (
        <AppBar position="sticky" sx={{ mb: 2 }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6"><StyledLink to="/">RecipeBook</StyledLink></Typography>
                <Box>{user ? <UserMenu user={user} /> : <AnonymousMenu />}</Box>
            </Toolbar>
        </AppBar>
    );
};


export default AppToolbar;