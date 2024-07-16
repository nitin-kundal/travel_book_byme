const navbarStyles = (theme) => ({
    navbar: {
        backgroundColor: '#fff',
        color: '#000',
        boxShadow: 'none',
        borderBottom: '1px solid #e0e0e0',
        padding: theme.spacing(1, 2),
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
    },
    navButtons: {
        display: 'flex',
        alignItems: 'center',
    },
    navButton: { marginLeft: theme.spacing(2) },
    logoImage: {
        height: 40,
        marginRight: theme.spacing(1),
    },
});

export default navbarStyles;
