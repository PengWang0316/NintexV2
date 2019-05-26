import { Auth } from 'aws-amplify';

const REMOVE_BRACKET_REGEXP = /[{}]/g;

const getTokenAndData = async (text) => {
  const { idToken: { jwtToken } } = await Auth.currentSession();
  const dataArray = text.replace(/\r/g, '\n')
    .replace(REMOVE_BRACKET_REGEXP, '').split(/\n/g);
  return [dataArray, jwtToken];
};
export default getTokenAndData;
