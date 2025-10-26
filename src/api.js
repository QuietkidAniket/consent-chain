import { fetchAuthSession } from 'aws-amplify/auth';

// IMPORTANT: Replace this with your actual API Gateway Invoke URL
const API_BASE_URL = 'https://pwawlbchnb.execute-api.ap-south-1.amazonaws.com/v1';

async function getAuthToken() {
  try {
    const { idToken } = (await fetchAuthSession()).tokens ?? {};
    return idToken;
  } catch (err) {
    console.error('Error fetching auth session:', err);
    return null;
  }
}

// Function to get all consents for the logged-in user
export const getConsents = async () => {
  const token = await getAuthToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/consents`, {
    method: 'GET',
    headers: {
      'Authorization': token.toString(),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch consents');
  }
  return response.json();
};

// Function to create a new consent record
export const createConsent = async (consentData) => {
  const token = await getAuthToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_BASE_URL}/consents`, {
    method: 'POST',
    headers: {
      'Authorization': token.toString(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(consentData),
  });

  if (!response.ok) {
    throw new Error('Failed to create consent');
  }
  return response.json();
};