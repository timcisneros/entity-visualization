import { CognitoUserPool } from 'amazon-cognito-identity-js';

const userPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID;
const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
const cognitoUserPool =
    userPoolId && clientId
        ? new CognitoUserPool({ UserPoolId: userPoolId, ClientId: clientId })
        : null;

export default cognitoUserPool;
