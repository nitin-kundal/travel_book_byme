import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import homeStyles from '../styles/HomeStyles';
import SearchHotelForm from './SearchHotelForm';

const useStyles = makeStyles(homeStyles, { name: 'Home' });

function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.overlay}>
                <div className={classes.formContainer}>
                    <Paper className={classes.paper}>
                        <Grid container className={classes.title}>
                            <Typography variant="h5" gutterBottom>
                                Ready to find a great hotel deal?
                            </Typography>
                        </Grid>
                        <SearchHotelForm classes={classes} />
                    </Paper>
                </div>
            </div>
        </div>
    );
}

export default Home;
