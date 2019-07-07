export const getChipAttribute = (event: React.MouseEvent, attributeName: string) => {
  const target = event.target as HTMLElement;
  const divElement = target.tagName === 'path' ? target.parentNode.parentNode as HTMLElement : target.parentNode as HTMLElement;
  return divElement.getAttribute(attributeName);
};
export default getChipAttribute;
