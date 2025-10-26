import { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress, CssBaseline, Container } from '@mui/material';
import { getCurrentUser, signOut } from 'aws-amplify/auth';

import SignUp from './components/SignUp';
import ConfirmSignUp from './components/ConfirmSignUp';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';

function App() {
  const [view, setView] = useState('signIn');
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setView('dashboard');
      } catch (error) {
        // Not signed in
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);
  
  const handleSignUpSuccess = (newUsername) => {
    setUsername(newUsername);
    setView('confirmSignUp');
  };

  const handleConfirmSuccess = () => {
    alert('Account confirmed! Please sign in.');
    setView('signIn');
  };

  const handleSignInSuccess = async () => {
    try {
      setLoading(true);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setView('dashboard');
    } catch(err){
      console.error("Error fetching user after sign in", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    setView('signIn');
  };

  if (loading) {
    return <CircularProgress />;
  }

  let currentView;
  if (view === 'dashboard') {
    // --- THIS IS THE UPDATED SECTION ---
    currentView = (
      <Box sx={{ width: '100%' }}>
        <Dashboard user={user} />
        <Button variant="contained" color="error" sx={{ mt: 4 }} onClick={handleSignOut}>
          Sign Out
        </Button>
      </Box>
    );
    // --- END OF UPDATE ---
  } else if (view === 'signUp') {
    currentView = <SignUp onSignUpSuccess={handleSignUpSuccess} showSignIn={() => setView('signIn')} />;
  } else if (view === 'confirmSignUp') {
    currentView = <ConfirmSignUp username={username} onConfirmSuccess={handleConfirmSuccess} />;
  } else {
    currentView = <SignIn onSignInSuccess={handleSignInSuccess} showSignUp={() => setView('signUp')} />;
  }

  return (
    <Container component="main" maxWidth="md"> {/* Changed to 'md' for more space */}
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 4,
        }}
      >
        {currentView}
      </Box>
    </Container>
  );
}

export default App;