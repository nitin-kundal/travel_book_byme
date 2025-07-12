const hotelListStyles = (theme) => ({
    hotelCard: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            flexWrap: 'initial',
        },
    },
    hotelImage: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 200,
        },
    },
    hotelDetails: {
        flex: 1,
        padding: theme.spacing(2),
    },
    priceSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            alignItems: 'center',
        },
    },
});

export default hotelListStyles;
