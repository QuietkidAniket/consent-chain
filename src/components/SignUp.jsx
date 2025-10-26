import { useState } from 'react';
import { signUp } from 'aws-amplify/auth';
// Import components from MUI
import { Box, Button, TextField, Typography, Link, Alert, CircularProgress } from '@mui/material';

export default function SignUp({ onSignUpSuccess, showSignIn }) {
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signUp({
        username: formData.username,
        password: formData.password,
        options: { userAttributes: { email: formData.email } },
      });
      onSignUpSuccess(formData.username);
    } catch (err) {
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
      }}
    >
      <Typography component="h1" variant="h5">
        Create Account
      </Typography>
      <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>
        <Link href="#" variant="body2" onClick={showSignIn}>
          {"Already have an account? Sign In"}
        </Link>
      </Box>
    </Box>
  );
}