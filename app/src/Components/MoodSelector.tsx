import {useState} from 'react';
import {Box, Typography, Button, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';

const moods = [
  {value: 'calm', label: 'Calmado', icon: <SentimentSatisfiedIcon color="primary"/>},
  {value: 'relieved', label: 'Aliviado', icon: <SentimentVerySatisfiedIcon color="success"/>},
  {value: 'sad', label: 'Triste', icon: <MoodBadIcon color="info"/>},
  {value: 'angry', label: 'Enojado', icon: <SentimentVeryDissatisfiedIcon color="error"/>},
  {value: 'motivated', label: 'Motivado', icon: <SentimentNeutralIcon color="secondary"/>},
];

const MoodSelector = () => {
  const [mood, setMood] = useState('');

  const handleSubmit = async () => {
    try {
      await fetch('http://neurolog.localhost/api/mood', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({mood}),
      });
      alert('Gracias por compartir cómo te sentís.');
      setMood('');
    } catch (error) {
      alert('Error al enviar la emoción. Intentá nuevamente.');
    }
  };

  return (
      <Box sx={{mt: 3}}>
        <Typography variant="h6" gutterBottom>
          ¿Cómo te sentís ahora?
        </Typography>

        <RadioGroup
            row
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            sx={{justifyContent: 'space-around'}}
        >
          {moods.map(({value, label, icon}) => (
              <FormControlLabel
                  key={value}
                  value={value}
                  control={<Radio sx={{display: 'none'}}/>}
                  label={
                    <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          cursor: 'pointer',
                          color: mood === value ? 'primary.main' : 'text.secondary',
                          '&:hover': {color: 'primary.dark'},
                        }}
                    >
                      {icon}
                      <Typography variant="caption" sx={{mt: 0.5}}>
                        {label}
                      </Typography>
                    </Box>
                  }
              />
          ))}
        </RadioGroup>

        <Button
            variant="contained"
            fullWidth
            sx={{mt: 2}}
            onClick={handleSubmit}
            disabled={!mood}
        >
          Enviar
        </Button>
      </Box>
  );
};

export default MoodSelector;
