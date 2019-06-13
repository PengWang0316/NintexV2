export const getChipAttribute = (event, attributeName) => {
  const divElement = event.target.tagName === 'path' ? event.target.parentNode.parentNode : event.target.parentNode;
  return divElement.getAttribute(attributeName);
};
export default getChipAttribute;
