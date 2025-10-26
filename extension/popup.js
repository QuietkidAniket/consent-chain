// NOTE: All authentication imports, configuration, and storage logic are removed.
// This script now only handles opening the external dashboard URL.

// The single, permanent Dashboard URL (Your CloudFront Distribution)
const DASHBOARD_URL = 'https://d2q9vn5dgx10z1.cloudfront.net/'; 

// --- FUNCTIONS ---
function openDashboard() {
  // Always open the dashboard URL. The web app handles sign-in/dashboard redirect.
  window.open(DASHBOARD_URL);
}

// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', function() {
  const dashboardBtn = document.getElementById('dashboardBtn');
  if (dashboardBtn) {
    dashboardBtn.addEventListener('click', openDashboard);
  }
});