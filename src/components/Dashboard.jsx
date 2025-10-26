import { useState, useEffect } from 'react';
import { getConsents } from '../api';
import {
  Box, Typography, CircularProgress, Alert,
  List, ListItem, ListItemText, Divider, Button, // Removed Dialog imports
  Link
} from '@mui/material';

// We keep the privacy links for future use, but the modal logic is gone.
const privacyLinks = {
  'www.google.com': 'https://myadcenter.google.com/controls',
  'www.youtube.com': 'https://www.youtube.com/account_privacy',
  'www.facebook.com': 'https://www.facebook.com/settings/?tab=privacy',
  'www.amazon.com': 'https://www.amazon.com/gp/help/customer/display.html?nodeId=468496',
  'twitter.com': 'https://twitter.com/settings/privacy_and_safety',
  'x.com': 'https://x.com/settings/privacy_and_safety'
};

export default function Dashboard({ user }) {
  const [consents, setConsents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Removed state for isModalOpen and selectedConsent

  useEffect(() => {
    const fetchConsents = async () => {
      try {
        setLoading(true);
        const data = await getConsents();
        setConsents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchConsents();
  }, []);

  // Removed handleRevokeClick and handleCloseModal functions
  
  // NOTE: You can re-introduce the simple Revoke guidance without the button/modal,
  // by clicking the list item later, but for now, we focus on stability.

  const handleExport = () => {
    if (consents.length === 0) {
      alert("No consent data to export.");
      return;
    }

    const headers = ['Website', 'Permissions', 'Date'];
    const rows = consents.map(consent => [
      `"${consent.website}"`,
      `"${consent.permissions.join(', ')}"`,
      `"${new Date(consent.date).toISOString()}"`
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'consent_log.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {user?.username}!
        </Typography>
        <Button variant="contained" onClick={handleExport} disabled={consents.length === 0}>
          Export as CSV
        </Button>
      </Box>

      <Typography variant="h6" component="h2">
        Your Consent Log
      </Typography>
      
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      
      {consents.length === 0 && !error && (
        <Typography sx={{ mt: 2 }}>You have not logged any consents yet.</Typography>
      )}

      <List>
        {consents.map((consent, index) => (
          <div key={consent.consentId}>
            <ListItem
              // secondaryAction is REMOVED
            >
              <ListItemText
                primary={consent.website}
                secondary={`Permissions: ${consent.permissions.join(', ')} - Date: ${new Date(consent.date).toLocaleDateString()}`}
              />
            </ListItem>
            {index < consents.length - 1 && <Divider />}
          </div>
        ))}
      </List>
      
      {/* The Dialog/Modal component is REMOVED */}
    </Box>
  );
}