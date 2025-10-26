import { useState } from 'react';
import { confirmSignUp } from 'aws-amplify/auth';
// Import components from MUI
import { Box, Button, TextField, Typography, Alert, CircularProgress } from '@mui/material';

export default function ConfirmSignUp({ username, onConfirmSuccess }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await confirmSignUp({ username, confirmationCode: code });
      onConfirmSuccess();
    } catch (err)      {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '400px',
        textAlign: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Confirm Your Account
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        A confirmation code was sent to your email for user: <strong>{username}</strong>
      </Typography>
      <Box component="form" onSubmit={handleConfirm} sx={{ mt: 1, width: '100%' }}>
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
        <TextField
          margin="normal"
          required
          fullWidth
          name="code"
          label="Confirmation Code"
          id="code"
          autoFocus
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Confirm'}
        </Button>
      </Box>
    </Box>
  );
}