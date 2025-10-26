import { Amplify } from 'aws-amplify';
import { signIn, signOut, getCurrentUser, fetchAuthSession } from '@aws-amplify/auth';

Amplify.configure({
  Auth: {
    Cognito: {
      region: 'ap-south-1',
      userPoolId: 'ap-south-1_ZmttefZCj',
      userPoolClientId: '156hu538g52dhkn82riiuu1ei1'
    }
  }
});

// --- DOM ELEMENTS ---
const loginView = document.getElementById('loginView');
const loggedInView = document.getElementById('loggedInView');
const loginForm = document.getElementById('loginForm');
const signOutBtn = document.getElementById('signOutBtn');
const loggedInUserEl = document.getElementById('loggedInUser');
const statusEl = document.getElementById('status');
const dashboardBtn = document.getElementById('dashboardBtn'); // <-- GET THE NEW BUTTON

// --- FUNCTIONS ---
async function checkAuthState() {
  // ... (this function remains the same)
  try {
    const { username } = await getCurrentUser();
    loggedInUserEl.textContent = username;
    loginView.style.display = 'none';
    loggedInView.style.display = 'block';
  } catch (error) {
    loginView.style.display = 'block';
    loggedInView.style.display = 'none';
  }
}

async function handleSignIn(event) {
  // ... (this function remains the same)
  event.preventDefault();
  statusEl.textContent = 'Signing in...';
  const username = loginForm.username.value;
  const password = loginForm.password.value;
  try {
    await signIn({ username, password });
    const session = await fetchAuthSession();
    const idToken = session.tokens.idToken.toString();
    chrome.storage.local.set({ authToken: idToken });
    await checkAuthState();
    statusEl.textContent = '';
  } catch (error) {
    statusEl.textContent = error.message;
  }
}

async function handleSignOut() {
  // ... (this function remains the same)
  try {
    await signOut();
    chrome.storage.local.remove('authToken');
    await checkAuthState();
  } catch (error) {
    statusEl.textContent = error.message;
  }
}

// --- NEW FUNCTION ---
function openDashboard() {
  // This is the URL where your React app is running
  window.open('https://d2q9vn5dgx10z1.cloudfront.net/');
}

// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', checkAuthState);
loginForm.addEventListener('submit', handleSignIn);
signOutBtn.addEventListener('click', handleSignOut);
dashboardBtn.addEventListener('click', openDashboard); // <-- ADD EVENT LISTENER FOR NEW BUTTON