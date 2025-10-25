import type { FC, MouseEvent } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import type {User} from "../../../types";
import {useAppDispatch} from "../../../app/hooks.ts";
import {logout} from "../../../features/users/usersThunk.ts";

interface Props { user: User; }

const UserMenu: FC<Props> = ({ user }) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


    const openMenu = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const closeMenu = () => setAnchorEl(null);


    const handleLogout = async () => { await dispatch(logout()); };


    return (
        <>
            <Button onClick={openMenu} color="inherit">{user.displayName}</Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
                <MenuItem component={RouterLink} to={`/authors/${user._id}`}>Мои рецепты</MenuItem>
                <MenuItem component={RouterLink} to="/recipes/new">Создать рецепт</MenuItem>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
        </>
    );
};


export default UserMenu;