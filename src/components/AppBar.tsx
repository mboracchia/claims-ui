import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {Button, Container, Divider, ListItemIcon, ListItemText} from "@mui/material";
import {Logout, Settings} from "@mui/icons-material";
import {useHistory} from "react-router-dom";

type MenuAppBarProps = {
    isLoggedIn: boolean,
    userRole: string,
    title?: string,
}

export default function MenuAppBar(props: MenuAppBarProps) {
    const [auth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const history = useHistory();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = () => {
        history.push('/login')
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Container>
                    <Toolbar disableGutters>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {props.title ? props.title : 'Gestión de Reclamos'}
                        </Typography>
                        {auth && props.isLoggedIn && (
                            <div>
                                <Button
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                    <Box ml={1}>
                                        <Typography variant="body2" component="div" sx={{ flexGrow: 1 }} marginLeft={'10'}>
                                            { props.userRole }
                                        </Typography>
                                    </Box>
                                </Button>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClick}>
                                        <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
                                        <ListItemText>Cerrar Sesión</ListItemText>
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
