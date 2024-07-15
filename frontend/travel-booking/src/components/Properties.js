import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
    },
    card: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
    },
    media: {
        height: 200,
    },
    cardContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        padding: theme.spacing(2),
    },
    sectionTitle: {
        textAlign: 'center',
        marginBottom: theme.spacing(4),
    },
}));

const featuredProperties = [
    { id: 1, type: 'House', description: 'Introducing The New Golden City To Embrace New Golden Of People.', imageUrl: 'https://via.placeholder.com/300x200' },
    { id: 2, type: 'Apartment', description: 'Introducing The New Golden City To Embrace New Golden Of People.', imageUrl: 'https://via.placeholder.com/300x200' },
    { id: 3, type: 'Villa', description: 'Introducing The New Golden City To Embrace New Golden Of People.', imageUrl: 'https://via.placeholder.com/300x200' },
];

const FeaturedProperties = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="lg" className={classes.container}>
            <Typography variant="h4" className={classes.sectionTitle}>
                Discover Our Premium Property
            </Typography>
            <Grid container spacing={4}>
                {featuredProperties.map((property) => (
                    <Grid item xs={12} sm={4} key={property.id}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image={property.imageUrl}
                                title={property.type}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography variant="h6">{property.type}</Typography>
                                <Typography variant="body2">{property.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default FeaturedProperties;
