import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import AuthContext from '../contexts/AuthContext';
import navbarStyles from '../styles/NavbarStyles';
import localisable from '../config/localisable';

const useStyles = makeStyles(navbarStyles, { name: 'Navbar' });

function Navbar() {
    const classes = useStyles();
    const navigate = useNavigate();
    const { logout, isAuthenticated } = useContext(AuthContext);

    const onClickLogin = () => {
        navigate('/login', { replace: true });
    };

    return (
        <AppBar position="static" className={classes.navbar}>
            <Toolbar className={classes.toolbar}>
                <a href="/" className={classes.logo}>
                    <img src={Logo} alt="Logo" className={classes.logoImage} />
                    <Typography variant="h6" noWrap>
                        {localisable.otelle}
                    </Typography>
                </a>
                <div className={classes.navButtons}>
                    <Button color="inherit" className={classes.navButton} onClick={() => navigate('/')}>Home</Button>
                    {
                        isAuthenticated && (
                            <Button
                                color="inherit"
                                className={classes.navButton}
                                onClick={() => navigate('/bookings')}
                            >
                                {localisable.bookingHistory}
                            </Button>
                        )
                    }
                    {
                        isAuthenticated
                            ? (
                                <Button
                                    color="inherit"
                                    className={classes.navButton}
                                    onClick={() => logout()}
                                >
                                    {localisable.logout}
                                </Button>
                            )
                            : (
                                <Button
                                    color="inherit"
                                    className={classes.navButton}
                                    onClick={onClickLogin}
                                >
                                    {localisable.login}
                                </Button>
                            )
                    }
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
