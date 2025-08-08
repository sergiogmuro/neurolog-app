import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const EmotionButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [emotion, setEmotion] = useState('');
  const [audio] = useState(new Audio('/public/heavy-doom-metal-instrumental-288971.mp3')); // Asegurate de tener este archivo en /public

  const handleOpen = () => {
    setOpen(true);
    try {
      audio.play().catch(() => {});
    } catch (e) {}
  };

  const handleClose = () => {
    audio.pause();
    audio.currentTime = 0;
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log('Estado emocional:', emotion);
    // Aquí podrías hacer un POST al backend si lo necesitás
    handleClose();
  };

  return (
      <>
        <Button
            variant="contained"
            color="secondary"
            startIcon={<MusicNoteIcon />}
            onClick={handleOpen}
        >
          Desahogarse
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Desahogo emocional 🎧</DialogTitle>
          <DialogContent>
            <p>Disfrutá de un momento para vos. Respirá hondo.</p>
            <TextField
                autoFocus
                margin="dense"
                label="¿Cómo te sentís ahora?"
                fullWidth
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button variant="contained" onClick={handleSubmit}>Enviar</Button>
          </DialogActions>
        </Dialog>
      </>
  );
};

export default EmotionButton;
