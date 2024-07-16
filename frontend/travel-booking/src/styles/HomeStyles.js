const homeStyles = (theme) => ({
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
        '&:hover': { backgroundColor: '#0056b3' },
    },
    title: { paddingBottom: theme.spacing(3) },
});

export default homeStyles;
