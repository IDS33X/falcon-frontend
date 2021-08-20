import { createTheme } from '@material-ui/core';
const theme = createTheme({
    palette: {
        primary: {
            main: "#023E7D"
        },
        secondary: {

            main: "#D54A4F"
        },
     

    },
    typography: {
        fontFamily: [
            'Candara',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        textTransform: 'none'

    }

});

export default theme;