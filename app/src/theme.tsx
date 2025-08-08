// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6C63FF', // violeta moderno
    },
    secondary: {
      main: '#FF6584', // acento rosado vibrante
    },
    background: {
      default: '#F4F4F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#6C6C80',
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h4: {
      fontWeight: 700,
      fontSize: '1.8rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.4rem',
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '1rem',
    },
  },
});

export default theme;
