import { CircularProgress, Container, Paper, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { fetchBookingHistory } from '../api/api';
import getRandomInteger from '../utils/Utils';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        borderRadius: '10px',
    },
    media: {
        height: 100,
        width: 100,
        borderRadius: '10px',
    },
    content: {
        flex: '1 0 auto',
        paddingLeft: theme.spacing(2),
    },
    price: {
        marginLeft: 'auto',
    },
    heading: {
        marginBottom: theme.spacing(2),
    },
}));

const BookingHistory = () => {
    const classes = useStyles();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBookingHistory = async () => {
            try {
                const data = await fetchBookingHistory();
                setBookings(data);
            } catch (error) {
                console.error('Error fetching booking history:', error);
            }
            setLoading(false);
        };
        getBookingHistory();
    }, []);

    return (
        <Container maxWidth="md" className={classes.container}>
            <Typography variant="h4" className={classes.heading}>
                Booking History
            </Typography>
            {loading ? (
                <div className={classes.loader}>
                    <CircularProgress />
                </div>
            ) : <>
                <Typography variant="h6" className={classes.heading}>
                    Total Bookings: {bookings.length}
                </Typography>
                {bookings.length > 0 ? (
                    bookings.map((booking, index) => {
                        const { hotel: { name, location }, check_in_date: checkInDate, check_out_date: checkOutDate, total_cost: total } = booking || {};
                        return (
                            <Paper key={index} className={classes.paper}>
                                <img
                                    className={classes.media}
                                    src={`assets/hotel${getRandomInteger(1, 10)}.jpg`}
                                    alt={name}
                                />
                                <div className={classes.content}>
                                    <Typography component="h5" variant="h5">
                                        {name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {new Date(checkInDate).toLocaleDateString()} – {new Date(checkOutDate).toLocaleDateString()} · {location}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {"Completed"}
                                    </Typography>
                                </div>
                                <Typography variant="h6" className={classes.price}>
                                    ₹{Number(total).toFixed(2)}
                                </Typography>
                            </Paper>
                        )
                    })
                ) : (
                    <Typography variant="body1">No bookings found.</Typography>
                )}
            </>
            }
        </Container>
    );
};

export default BookingHistory;
