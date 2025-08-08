import { useState } from 'react';
import { Box, Typography, Button, AppBar, Toolbar } from '@mui/material';
import MusicPlayer from '../components/MusicPlayer';
import MoodSelector from '../components/MoodSelector';

const Desahogo = () => {
  const [showMood, setShowMood] = useState(false);

  return (
      <Box display="flex" flexDirection="column" height="100vh" >
        {/* Header */}
        <AppBar
            position="static"
            elevation={0}
            sx={{ bgcolor: 'transparent', color: 'text.primary', pt: 1 }}
        >
          <Toolbar sx={{ justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
              Momento de desahogo
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Contenido */}
        <Box flex={1} display="flex" flexDirection="column" p={3} gap={3}>
          <Typography variant="h5" sx={{ fontWeight: 600, textAlign: 'center', color: 'primary.main' }}>
            Relajate y expresate
          </Typography>

          <Box>
            <MusicPlayer />
          </Box>

          {!showMood && (
              <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    bgcolor: 'secondary.main',
                  }}
                  onClick={() => setShowMood(true)}
              >
                Ya me desahogué
              </Button>
          )}

          {showMood && (
              <Box sx={{ mt: 2 }}>
                <MoodSelector />
              </Box>
          )}
        </Box>
      </Box>
  );
};

export default Desahogo;
