import { Typography, Box, AppBar, Toolbar, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SentimentVerySatisfied, SentimentSatisfied, SentimentNeutral, SentimentDissatisfied, SentimentVeryDissatisfied } from '@mui/icons-material';

const emotions = [
  { label: 'Muy feliz', icon: <SentimentVerySatisfied sx={{ fontSize: 40, color: '#FFD93B' }} /> },
  { label: 'Feliz', icon: <SentimentSatisfied sx={{ fontSize: 40, color: '#6BCB77' }} /> },
  { label: 'Neutral', icon: <SentimentNeutral sx={{ fontSize: 40, color: '#4D96FF' }} /> },
  { label: 'Triste', icon: <SentimentDissatisfied sx={{ fontSize: 40, color: '#FF6B6B' }} /> },
  { label: 'Muy triste', icon: <SentimentVeryDissatisfied sx={{ fontSize: 40, color: '#D61C4E' }} /> },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleEmotionSelect = (emotion: string) => {
    console.log("Emoción seleccionada:", emotion);
    navigate('/desahogo');
  };

  return (
      <Box
          display="flex"
          flexDirection="column"
          height="100vh"
          sx={{

          }}
      >
        {/* Header */}
        <AppBar
            position="static"
            elevation={0}
            sx={{
              bgcolor: 'transparent',
              color: 'inherit',
              pt: 1,
            }}
        >
          <Toolbar sx={{ justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
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
            px={3}
            textAlign="center"
        >
          <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                mb: 3,
                textShadow: '0 2px 4px rgba(0,0,0,0.4)',
              }}
          >
            ¿Cómo te sientes ahora?
          </Typography>

          {/* Emociones */}
          <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={2}
              maxWidth={350}
          >
            {emotions.map((emo) => (
                <Paper
                    key={emo.label}
                    onClick={() => handleEmotionSelect(emo.label)}
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      borderRadius: '50%',
                      width: 70,
                      height: 70,
                      bgcolor: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(6px)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease',
                      '&:hover': { transform: 'scale(1.1)' },
                    }}
                    elevation={0}
                >
                  {emo.icon}
                </Paper>
            ))}
          </Box>

          {/* Botón grande */}
          <Button
              variant="contained"
              size="large"
              sx={{
                mt: 5,
                borderRadius: '50px',
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                backgroundColor: '#FF6B6B',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                '&:hover': {
                  backgroundColor: '#ff5252',
                },
              }}
              onClick={() => navigate('/desahogo')}
          >
            Registrar
          </Button>
        </Box>
      </Box>
  );
};

export default HomePage;
