import { Button, Container, Divider, Grid, makeStyles, Paper, Snackbar, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookHotel } from '../api/api';
import bookHotelStyles from '../styles/BookHotelStyles';
import localisable from '../config/localisable';
import { formatDateLocale } from '../utils/Utils';

const useStyles = makeStyles(bookHotelStyles, { name: 'BookHotel' });

function HotelDetails() {
    const classes = useStyles();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { hotel, checkInDate, checkOutDate } = state || {};
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
                throw new Error(localisable.bookingFailed);
            }
        } catch (err) {
            setError(localisable.bookingFailed);
        }
    };

    const calculateTotalAmount = (pricePerNight) => {
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
                    {localisable.yourBookingDetails}
                </Typography>
                <Divider className={classes.divider} />
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <Typography variant="h6" className={classes.sectionTitle}>
                            {localisable.checkIn}
                        </Typography>
                        <Typography variant="body1">
                            {formatDateLocale(checkInDate)}
                        </Typography>
                        <Typography variant="body2" className={classes.subtext}>
                            {localisable.checkInTime}
                        </Typography>
                    </Grid>
                    <Grid container item xs={6} direction="column" alignItems='flex-end'>
                        <Typography variant="h6" className={classes.sectionTitle}>
                            {localisable.checkOut}
                        </Typography>
                        <Typography variant="body1">
                            {formatDateLocale(checkOutDate)}
                        </Typography>
                        <Typography variant="body2" className={classes.subtext}>
                            {localisable.checkOutTime}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justifyContent="space-between" alignItems="center" className={classes.pricePerNight}>
                    <Typography variant="body2">
                        {localisable.totalLengthOfStay}
                    </Typography>
                    <Typography variant="body2">
                        {Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))} night(s)
                    </Typography>
                </Grid>
                <Divider className={classes.divider} />
                <Typography variant="body2" className={classes.fontWeightBold}>
                    {localisable.yourPriceSummary}
                </Typography>
                <Grid container className={classes.priceDetails}>
                    <Grid container justifyContent="space-between" alignContent="center">
                        <Typography variant="body2">Original price per night</Typography>
                        <Typography variant="body2">
                            {localisable.rupeeSymbol} {Number(hotel.price_per_night).toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid container justifyContent="space-between" alignContent="center">
                        <Typography variant="body2" className={classes.price}>Total amount</Typography>
                        <Typography variant="body2" className={classes.price}>
                            {localisable.rupeeSymbol} {calculateTotalAmount(hotel.price_per_night)}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                {isBooked ? (
                    <>
                        <Typography variant="h6" className={classes.successMessage}>
                            {localisable.bookingSuccessful}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => navigate('/')}
                        >
                            {localisable.returnToHome}
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleCheckout}
                    >
                        {localisable.checkout}
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
}

export default HotelDetails;
