// AppContainer.tsx
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { CssBaseline, Box } from '@mui/material';

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
            sx={{
              minHeight: '100vh',
              bgcolor: 'background.default',
              display: 'flex',
              flexDirection: 'column',
              pb: 8, // espacio para BottomNav
              background: 'linear-gradient(180deg, #2E0259 0%, #FA7268 100%)',
              color: '#fff',
            }}
        >
          {children}
        </Box>
      </ThemeProvider>
  );
};

export default AppContainer;
