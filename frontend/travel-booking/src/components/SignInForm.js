import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthContext from '../contexts/AuthContext';
import localisable from '../config/localisable';

function SignInForm({ classes }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext) || {};
    const location = useLocation();

    // Parse the "from" query parameter from the URL
    const queryParams = new URLSearchParams(location.search);
    const from = queryParams.get('from') || '/';

    const path = location.state?.from || from || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password, path);
    };

    return (
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!(username && password)}
            >
                {localisable.signIn}
            </Button>
            <Grid container justifyContent='flex-end'>
                    <Link href="/signup" variant="body2">
                        {localisable.doNotHaveAccount}
                    </Link>
            </Grid>
        </form>
    );
}

SignInForm.propTypes = { classes: PropTypes.object };

export default SignInForm;
