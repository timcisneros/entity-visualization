import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_eIsaZvDBw',
  ClientId: 'gu6b8hhks22jkhg5fuo92hh5d',
};

export default new CognitoUserPool(poolData);
