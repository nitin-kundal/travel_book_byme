import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { createUser } from '../api/api';
import localisable from '../config/localisable';

function SignUpForm({ classes }) {
    const [formData, setFormData] = useState({
        password: '',
        email: '',
        first_name: '',
        last_name: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createUser(formData);
            if (response.status === 201) {
                setSuccess(true);
                setError(null);
            }
        } catch (err) {
            setError(err.response.data);
            setSuccess(false);
        }
    };

    return (
        <>
            {success && <Typography color="primary">{localisable.userCreatedSuccessfully}</Typography>}
            {error && <Typography color="error">{localisable.somethingWentWrong}</Typography>}
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="fname"
                            name="first_name"
                            variant="outlined"
                            required
                            fullWidth
                            id="first_name"
                            label="First Name"
                            autoFocus
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="last_name"
                            label="Last Name"
                            name="last_name"
                            autoComplete="lname"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={!Object.values(formData).every(Boolean)}
                >
                    {localisable.signUp}
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/login" variant="body2">
                            {localisable.alreadyHaveAccount}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

SignUpForm.propTypes = { classes: PropTypes.object };

export default SignUpForm;
