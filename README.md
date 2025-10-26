# ConsentChain – Transparent Data Consent Tracker

## Project Overview

ConsentChain is a transparent and user-friendly system designed to empower individuals to track and manage their online data consent. By integrating a lightweight browser extension with a secure web dashboard, ConsentChain provides a single source of truth for all permissions granted to websites.

The system is built on a modern, scalable, serverless architecture using AWS services (Cognito, Lambda, API Gateway, DynamoDB, S3/CloudFront).

## How to Use the Application

The ConsentChain system has two main components: the **Browser Extension** for capturing consent, and the **Web Dashboard** for viewing and managing logs.

### 1. Web Dashboard (Live URL: [Insert Live CloudFront URL Here])

The dashboard is your personal data privacy center.

| **Feature** | **How to Use** | 
| :--- | :--- | 
| **User Sign-up** | Access the dashboard URL, click "Create one," and complete the sign-up process. Confirm your account using the code sent to your email. | 
| **View Consent Log** | After signing in, the main dashboard will display a timeline of all recorded consent actions (website, date, and general permissions). | 
| **Export Data** | Click the **"Export as CSV"** button in the top right corner. This downloads a spreadsheet containing a complete record of all your consent actions, which is useful for personal record-keeping and compliance. | 
| **Revoke Guidance** | Click the list entry for any consent. A modal window will appear, providing guidance on how to find the privacy settings on that specific website. For known sites (e.g., Google, YouTube), a direct link to the settings page will be provided. | 

### 2. Browser Extension Installation & Setup

The extension is the tool that automatically detects and records when you click an "Accept All" button.

#### A. Installation (Developer Mode Required)

1. **Open Chrome/Edge** and navigate to `chrome://extensions`.

2. Enable **Developer Mode** using the toggle switch in the top-right corner.

3. Click the **"Load unpacked"** button.

4. In the file dialog, select the **`extension`** folder from your project directory.

5. The **ConsentChain Tracker** icon will now appear in your browser's toolbar.

#### B. Initial Login (One-Time Setup)

**You must sign in to the extension before it can save any data.**

1. Click the **ConsentChain Tracker** icon in your toolbar.

2. The popup will show a "Sign In" form.

3. Enter the same **Username** and **Password** you used to create your account on the Web Dashboard.

4. Once signed in, the popup will show **"Logged in as: [Your Username]"**. The authentication token is now securely stored, and the extension is active.

#### C. Capturing Consent

1. Navigate to any public website that displays a **Cookie Consent Banner** (e.g., a news site).

2. Click the consent button (e.g., **"Accept All"**, **"I Agree"**, **"Got it"**).

3. The extension's background script will capture the click, retrieve your stored authentication token, and securely send the consent record to your AWS backend.

4. Click the **"Open Dashboard"** button in the extension popup to immediately see the new log entry on your web dashboard.