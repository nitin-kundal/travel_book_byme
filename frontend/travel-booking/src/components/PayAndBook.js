import { Button, Container, Divider, Grid, makeStyles, Paper, Snackbar, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookHotel } from '../api/api';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(8),
    },
    paper: {
        padding: theme.spacing(4),
        marginTop: theme.spacing(4),
    },
    header: {
        marginBottom: theme.spacing(3),
        fontWeight: 'bold',
    },
    details: {
        marginBottom: theme.spacing(2),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    totalAmount: {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    },
    button: {
        marginTop: theme.spacing(3),
    },
    sectionTitle: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
        fontWeight: 'bold',
    },
    subtext: {
        color: theme.palette.text.secondary,
    },
    priceDetails: {
        marginTop: theme.spacing(2),
    },
    price: { lineHeight: 2 },
    fontWeightBold: { fontWeight: 'bold' },
    pricePerNight: { marginTop: theme.spacing(1) }
}));

const HotelDetails = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { hotel, checkInDate, checkOutDate } =  state || {}
    const [error, setError] = useState('');
    const [isBooked, setIsBooked] = useState(false);

    const handleCheckout = async () => {
        const { id: hotelId } = hotel || {};
        try {
            const result = await bookHotel(hotelId, checkInDate, checkOutDate);
            if (result) {
                setError('');
                setIsBooked(true);
            } else {
                throw new Error('Booking failed');
            }
        } catch (err) {
            setError('Failed to create booking. Please try again.');
        }
    };

    const calculateTotalAmount = (pricePerNight, checkInDate, checkOutDate) => {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const diffTime = Math.abs(checkOut - checkIn);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return (pricePerNight * diffDays).toFixed(2);
    };

    return (
        <Container maxWidth="sm" className={classes.container}>
            <Paper className={classes.paper} elevation={3}>
                <Typography variant="h5" className={classes.header}>
                    Your Booking Details
                </Typography>
                <Divider className={classes.divider} />
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <Typography variant="h6" className={classes.sectionTitle}>
                            Check-in
                        </Typography>
                        <Typography variant="body1">
                            {new Date(checkInDate).toLocaleDateString('en-GB', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </Typography>
                        <Typography variant="body2" className={classes.subtext}>
                            From 12:00 PM
                        </Typography>
                    </Grid>
                    <Grid container item xs={6} direction='column'>
                        <Typography variant="h6" className={classes.sectionTitle}>
                            Check-out
                        </Typography>
                        <Typography variant="body1">
                            {new Date(checkOutDate).toLocaleDateString('en-GB', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </Typography>
                        <Typography variant="body2" className={classes.subtext}>
                            Until 11:00 AM
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justifyContent='space-between' alignItems='center' className={classes.pricePerNight}>
                    <Typography variant="body2">
                        Total length of stay
                    </Typography>
                    <Typography variant="body2">
                        {Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))} night(s)
                    </Typography>
                </Grid>
                <Divider className={classes.divider} />
                <Typography variant="body2" className={classes.fontWeightBold}>
                    Your Price Summary
                </Typography>
                <Grid container className={classes.priceDetails}>
                    <Grid container justifyContent='space-between' alignContent='center'>
                        <Typography variant="body2">Original price per night</Typography>
                        <Typography variant="body2">
                            ₹ {Number(hotel.price_per_night).toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid container justifyContent='space-between' alignContent='center'>
                        <Typography variant="body2" className={classes.price}>Total amount</Typography>
                        <Typography variant="body2" className={classes.price}>
                            ₹ {calculateTotalAmount(hotel.price_per_night, checkInDate, checkOutDate)}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                {isBooked ? (
                    <>
                        <Typography variant="h6" className={classes.successMessage}>
                            Booking successful! Your booking details have been saved.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => navigate('/')}
                        >
                            Return to Home
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleCheckout}
                    >
                        Checkout
                    </Button>
                )}
            </Paper>
            {error && (
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={Boolean(error)}
                    message={error}
                    onClose={() => setError('')}
                    autoHideDuration={6000}
                    severity="error"
                />
            )}
        </Container>
    );
};

export default HotelDetails;
