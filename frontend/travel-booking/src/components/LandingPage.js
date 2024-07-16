import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const useStyles = makeStyles(() => ({
    root: { height: '100vh' },
    main: { flexGrow: 1 },
}));

function LandingPage() {
    const classes = useStyles();

    return (
        <Grid container direction="column" wrap="nowrap" className={classes.root}>
            <Navbar />
            <main className={classes.main}>
                <Outlet />
            </main>
        </Grid>
    );
}

export default LandingPage;
