import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import AuthContext from '../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
    navbar: {
        backgroundColor: '#fff',
        color: '#000',
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0',
        padding: theme.spacing(1, 2),
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
    },
    navButtons: {
        display: 'flex',
        alignItems: 'center',
    },
    navButton: {
        marginLeft: theme.spacing(2),
    },
    logoImage: {
        height: 40,
        marginRight: theme.spacing(1),
    },
}));

const Navbar = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { logout, isAuthenticated } = useContext(AuthContext);

    const onClickLogin = () => {
        navigate('/login', { replace: true })
    }

    return (
        <AppBar position="static" className={classes.navbar}>
            <Toolbar className={classes.toolbar}>
                <a href="/" className={classes.logo}>
                    <img src={Logo} alt="Logo" className={classes.logoImage} />
                    <Typography variant="h6" noWrap>
                        Otelle
                    </Typography>
                </a>
                <div className={classes.navButtons}>
                    <Button color="inherit" className={classes.navButton} onClick={() => navigate('/')}>Home</Button>
                    {isAuthenticated && <Button color="inherit" className={classes.navButton} onClick={() => navigate('/bookings')}>Booking History</Button>}
                    {isAuthenticated ? <Button color="inherit" className={classes.navButton} onClick={() => logout()}>Logout</Button>
                        : <Button color="inherit" className={classes.navButton} onClick={onClickLogin}>Login</Button>}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

