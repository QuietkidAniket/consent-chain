import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      // The AWS Region where you created your Cognito User Pool (e.g., 'ap-south-1')
      region: 'ap-south-1',
      
      // Your Cognito User Pool ID
      userPoolId: 'ap-south-1_ZmttefZCj',
      
      // Your Cognito App Client ID (the one without a secret)
      userPoolClientId: '156hu538g52dhkn82riiuu1ei1'
    }
  }
});