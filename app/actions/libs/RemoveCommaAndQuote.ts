const FIND_COMMA_REGEXP = /(".*?,.*?")/g;
const REMOVE_COMMAN_QUOTE_REGEXP = /[,"]/g;
/**
 * Input text could include:
 * "Renewals - Partner ""Send Email Notifications""",Tenant,{F4DA5868-F70E-4D75-A212-A7236170CF3D},N/A,NWC / nintex-it (Eric Harris),Production,"Friday, 15 March 2019",N/A,Charles,{7E77622B-05A6-E811-BCE7-000D3A320C2B},00fc0bb5-5677-4e47-9f82-12765dee6e29,Set Email Subject,engine:assign,00000000-0000-0000-0000-000000000000,,salesops,Charles.Dordevich@Nintex.com,{8AF7A966-DB8E-4F00-A4EA-AA055B475DF7},Operations,Set a variable value,{E469A709-B2D9-4216-BE90-9AEFFBBC1F85},NWC,nintex-it (Eric Harris),,Set a variable value,Operations
 * "Demand Stage ""Contact"" Routing",Tenant,{0747A789-48A2-449C-982F-099CD3FBB827},N/A,NWC / nintex-it (Eric Harris),Production,"Tuesday, 9 April 2019",N/A,Eric,{5352672E-54A6-E811-BCE7-000D3A320C2B},e06b8afa-decd-4853-99e0-842dd53d82ef,Get item from collection,engine:getcollectionitem,00000000-0000-0000-0000-000000000000,,salesops,Eric.Harris@Nintex.com,{8AF7A966-DB8E-4F00-A4EA-AA055B475DF7},Collection operations,Get item from collection,{E469A709-B2D9-4216-BE90-9AEFFBBC1F85},NWC,nintex-it (Eric Harris),,Get item from collection,Collection operations
 * Adobe Sign Acct Request,Tenant,{208AE29A-BD78-4D57-9FBF-9044CE277617},N/A,NWC / safalosload,Production,"Friday, 5 April 2019",N/A,Martin,{159F519C-CC3B-E911-85B3-000D3A3375FD},c310533e-24e1-4e48-bf7c-dbe4febd6079,"Set Group to ""Nintex""",engine:assign,00000000-0000-0000-0000-000000000000,,safalosload,martin.banks@safalo.com,{8AF7A966-DB8E-4F00-A4EA-AA055B475DF7},Operations,Set a variable value,{64D08F99-729A-421A-90E3-9917C1ED8692},NWC,safalosload,,Set a variable value,Operations
 * @param {string} text is the whole text file
 * @return {string} return a string after remove double quote, comma, and curly bracket.
 */
const removeCommaAndQuote = (text: string): string => {
  // Replace double quote to a single comma first for more processing
  let newText = text.replace(/""/g, ',');
  // Remove quote and comma
  const result = newText.match(FIND_COMMA_REGEXP);
  if (result) {
    result.forEach((item) => {
      newText = newText.replace(item, item.replace(REMOVE_COMMAN_QUOTE_REGEXP, ''));
    });
  }
  return newText;
};
export default removeCommaAndQuote;
