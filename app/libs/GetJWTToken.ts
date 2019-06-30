import { Auth } from 'aws-amplify';

const getJwtToken = async () => {
  const { idToken: { jwtToken } } = await Auth.currentSession() as any;
  return jwtToken;
};

export default getJwtToken;
