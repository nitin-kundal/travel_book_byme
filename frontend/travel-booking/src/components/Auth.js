import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import { AUTH_SOURCE } from '../config/Constants';
import localisable from '../config/localisable';
import authStyles from '../styles/AuthStyles';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const useStyles = makeStyles(authStyles, { name: 'Auth' });

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {`${localisable.copyright} © `}
            <Link color="inherit" href="/">
                {localisable.otelle}
            </Link>{' '}
            {new Date().getFullYear()}
            .
        </Typography>
    );
}

function Auth({ source }) {
    const classes = useStyles();
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {source === AUTH_SOURCE.SIGN_IN ? localisable.signIn : localisable.signUp}
                    </Typography>
                    {
                        source === AUTH_SOURCE.SIGN_IN
                            ? <SignInForm classes={classes} /> : <SignUpForm classes={classes} />
                    }
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
        </Grid>
    );
}

Auth.propTypes = { source: PropTypes.oneOf([AUTH_SOURCE.SIGN_IN, AUTH_SOURCE.SIGN_UP]) };

export default Auth;
