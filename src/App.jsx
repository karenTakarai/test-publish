import { useState } from 'react';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';

export default function Publicar() {
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePublish = async () => {
    if (Number(price) < 50000) {
      setError('El precio no puede ser menor a $50,000');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ price, description })
      });

      const result = await response.blob();
      const screenshotUrl = URL.createObjectURL(result);
      window.open(screenshotUrl);
    } catch (e) {
      console.error('Error:', e);
      setError('Ocurrió un error al publicar');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" gutterBottom>Publicar Anuncio</Typography>
      
      <TextField
        type="number"
        label="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        margin="normal"
        error={Boolean(error)}
        helperText={error}
      />
      <TextField
        label="Descripción"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        onClick={handlePublish}
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : 'Publicar'}
      </Button>
    </div>
  );
}
