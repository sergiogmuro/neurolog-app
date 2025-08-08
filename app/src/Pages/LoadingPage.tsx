// LoadingPage.tsx
import {Typography, Box, AppBar, Toolbar} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

const LoadingPage = () => {
  return (
      <Box
          display="flex"
          flexDirection="column"
          height="100vh"
          sx={{
            // background: 'linear-gradient(135deg, #6C63FF 0%, #FF6584 100%)',
            // color: '#fff',
          }}
      >
        {/* Header */}
        <AppBar
            position="static"
            elevation={0}
            sx={{bgcolor: 'transparent', color: '#fff'}}
        >
          <Toolbar sx={{justifyContent: 'center'}}>
            <Typography variant="h6" sx={{fontWeight: 'bold'}}>
              NeuroLog
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Contenido */}
        <Box
            flex={1}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={2}
        >
          <Typography variant="h4" align="center" gutterBottom>
            “No sos un paciente. Sos una persona compleja.”
          </Typography>
          <Typography
              variant="body1"
              align="center"
              sx={{opacity: 0.85, maxWidth: 300}}
          >
            Neurolog te ayuda a entenderte, no a corregirte.
          </Typography>
        </Box>
      </Box>
  );
};

export default LoadingPage;
