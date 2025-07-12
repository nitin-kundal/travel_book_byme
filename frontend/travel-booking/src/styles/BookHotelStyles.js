const bookHotelStyles = (theme) => ({
    container: { marginTop: theme.spacing(8) },
    paper: {
        padding: theme.spacing(4),
        marginTop: theme.spacing(4),
    },
    header: {
        marginBottom: theme.spacing(3),
        fontWeight: 'bold',
    },
    details: { marginBottom: theme.spacing(2) },
    divider: { margin: theme.spacing(2, 0) },
    totalAmount: {
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    },
    button: { marginTop: theme.spacing(3) },
    sectionTitle: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
        fontWeight: 'bold',
    },
    subtext: { color: theme.palette.text.secondary },
    priceDetails: { marginTop: theme.spacing(2) },
    price: { lineHeight: 2 },
    fontWeightBold: { fontWeight: 'bold' },
    pricePerNight: { marginTop: theme.spacing(1) },
});

export default bookHotelStyles;
