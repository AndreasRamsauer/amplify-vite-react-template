import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        //main: '#1976d2',
        main: '#ffffff', // Primärfarbe
      },
      secondary: {
        main: '#dc004e', // Sekundärfarbe
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  });
  
  export default theme;