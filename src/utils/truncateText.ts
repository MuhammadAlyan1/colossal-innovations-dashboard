export function truncateText(text: string, maxTextLength = 200) {
  let shortText = '';
  if (text.length > maxTextLength) {
    shortText = text.slice(0, maxTextLength) + ' ...';
  } else {
    return text;
  }
  return shortText;
}
