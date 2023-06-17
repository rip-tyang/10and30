import { Auth } from 'aws-amplify'
import { CognitoUser } from 'amazon-cognito-identity-js';

export async function getCurrentUser(AuthAPI: typeof Auth): Promise<CognitoUser | null> {
  try {
    return await AuthAPI.currentAuthenticatedUser();
  } catch (err) {
    if (err === 'The user is not authenticated') {
        return null;
    }
    console.error(err);
    throw err;
  } 
}