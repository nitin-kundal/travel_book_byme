import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid, Paper, TextField, Typography, makeStyles } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { format } from 'date-fns';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const formatDate = (date, fmt = 'yyyy-MM-dd') => format(date, fmt);

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: 'url("home_bg.webp")', // Replace with the actual image URL or path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    paper: {
        padding: theme.spacing(4),
        margin: theme.spacing(2),
        borderRadius: '10px',
    },
    heading: {
        color: '#000',
        textAlign: 'center',
        marginBottom: theme.spacing(2),
    },
    searchButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#0056b3',
        },
    },
    title: { paddingBottom: theme.spacing(3) }
}));

const Home = () => {
    const classes = useStyles();
    const today = new Date();
    const defaultCheckOut = new Date(today);
    defaultCheckOut.setDate(today.getDate() + 1);

    const [destination, setDestination] = React.useState('');
    const [checkInDate, setCheckInDate] = React.useState(formatDate(today));
    const [checkOutDate, setCheckOutDate] = React.useState(formatDate(defaultCheckOut));
    const navigate = useNavigate();

    const handleSubmit = async () => {
        navigate(`/hotels?destination=${destination}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`);
    };

    const handleCheckInChange = (date) => {
        setCheckInDate(formatDate(date));
        const newCheckOut = new Date(date);
        newCheckOut.setDate(date.getDate() + 1);
        setCheckOutDate(formatDate(newCheckOut));
    };

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
                        <form noValidate autoComplete="off">
                            <Grid container spacing={3}>
                                <Grid item xs={4}>
                                    <TextField
                                        label="Destination"
                                        fullWidth
                                        variant="outlined"
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                    />
                                </Grid>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid item xs={4}>
                                        <DatePicker
                                            label="Check-in Date"
                                            fullWidth
                                            inputVariant="outlined"
                                            disablePast
                                            value={new Date(checkInDate)}
                                            onChange={handleCheckInChange}
                                            format="yyyy-MM-dd"
                                            className={classes.textField}
                                            disableToolbar
                                            autoOk
                                            shouldDisableDate={(date) => date < today}
                                            variant="inline" // Use inline variant
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <DatePicker
                                            label="Check-out Date"
                                            fullWidth
                                            inputVariant="outlined"
                                            value={new Date(checkOutDate)}
                                            onChange={(date) => setCheckOutDate(formatDate(date))}
                                            format="yyyy-MM-dd"
                                            className={classes.textField}
                                            disableToolbar
                                            autoOk
                                            disablePast
                                            shouldDisableDate={(date) => date < new Date(checkInDate)}
                                            variant="inline" // Use inline variant
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                                {/* <Grid item xs={12}>
                                    <TextField
                                        label="Total Guests"
                                        type="number"
                                        fullWidth
                                        variant="outlined"
                                        value={guests}
                                        onChange={(e) => setGuests(e.target.value)}
                                    />
                                </Grid> */}
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        disabled={!(destination && checkInDate && checkOutDate)}
                                        color="primary"
                                        variant="contained"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </div>
            </div>
        </div>
    );
};

export default Home;


