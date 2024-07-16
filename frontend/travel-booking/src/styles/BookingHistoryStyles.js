const bookingHistoryStyles = (theme) => ({
    container: { marginTop: theme.spacing(4), },
    loader: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        },
        borderRadius: '10px',
    },
    media: {
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
        [theme.breakpoints.up('sm')]: {
            width: 100,
            height: 100
        },
    },
    content: {
        margin: theme.spacing(2, 0),
        [theme.breakpoints.up('sm')]: {
            flex: '1 0 auto',
            margin: theme.spacing(0, 2),
        },
    },
    price: {
        marginTop: theme.spacing(1),
        fontWeight: 'bold',
        [theme.breakpoints.up('sm')]: {
            marginTop: 0,
        },
    },
    heading: { marginBottom: theme.spacing(2), },
});

export default bookingHistoryStyles;
