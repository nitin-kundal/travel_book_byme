import { Button, Card, CardContent, CardMedia, Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchHotels } from '../api/api';
import AuthContext from '../contexts/AuthContext';
import hotelListStyles from '../styles/HotelListStyles';
import { getRandomInteger } from '../utils/Utils';
import localisable from '../config/localisable';

const useStyles = makeStyles(hotelListStyles, { name: 'HotelList' });

function HotelList() {
    const classes = useStyles();
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const { guests } = location.state || {};
    const { isAuthenticated } = useContext(AuthContext);

    const destination = searchParams.get('destination');
    const checkInDate = searchParams.get('checkInDate');
    const checkOutDate = searchParams.get('checkOutDate');

    useEffect(() => {
        const getHotels = async () => {
            const result = await fetchHotels(destination, checkInDate, checkOutDate);
            setHotels(result);
            setLoading(false);
        };
        if (destination && checkInDate && checkOutDate) {
            getHotels();
        } else {
            navigate('/');
        }
    }, [destination, checkInDate, checkOutDate, navigate]);

    const handleBookNow = (hotel) => {
        if (isAuthenticated) {
            navigate('/hotels/book', { state: { hotel, destination, checkInDate, checkOutDate, guests } });
        } else {
            const currentPath = location.pathname;
            const queryString = location.search;
            const from = `${currentPath}${queryString}`;
            navigate('/login', { state: { from } });
        }
    };

    const renderList = () => {
        if (hotels.length === 0) {
            return <Typography variant="h6" className={classes.noResults}>No results found</Typography>;
        }

        return (
            <Grid container spacing={2}>
                {hotels.map((hotel) => (
                    <Grid item xs={12} key={hotel.id}>
                        <Card className={classes.hotelCard}>
                            <CardMedia
                                component="img"
                                alt={hotel.name}
                                height="140"
                                image={`assets/hotel${getRandomInteger(1, 10)}.jpg`}
                                title={hotel.name}
                                className={classes.hotelImage}
                            />
                            <CardContent className={classes.hotelDetails}>
                                <Typography variant="h6">{hotel.name}</Typography>
                                <Typography variant="body1">{hotel.location}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {getRandomInteger(1, 5)} ★ {getRandomInteger(1, 1000)} reviews
                                </Typography>
                            </CardContent>
                            <CardContent className={classes.priceSection}>
                                <Typography variant="h6">{`₹${hotel.price_per_night} per night`}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '10px' }}
                                    onClick={() => handleBookNow(hotel)}
                                >
                                    {localisable.bookNow}
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <Container maxWidth="md" className={classes.container}>
            <Grid container justifyContent='center'>
                <Typography variant="h4" gutterBottom>
                    Available Hotels
                </Typography>
            </Grid>
            {
                loading
                    ? <Typography variant="h6" className={classes.noResults}>Loading...</Typography>
                    : renderList()
            }
        </Container>
    );
}

export default HotelList;
