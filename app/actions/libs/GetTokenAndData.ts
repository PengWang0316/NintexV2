import getJwtToken from '../../libs/GetJWTToken';

const REMOVE_BRACKET_REGEXP = /[{}]/g;

const getTokenAndData = async (text: string): Promise<[string[], string]> => {
  const dataArray = text.replace(/\r/g, '\n')
    .replace(REMOVE_BRACKET_REGEXP, '').split(/\n/g);
  return [dataArray, await getJwtToken()];
};
export default getTokenAndData;
