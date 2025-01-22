export const parseResponse = (responseText) => {
  const sections = {};

  // Regular expression to match the section titles enclosed in '**' and capture content after them
  const sectionRegex = /\*\*(.*?)\*\*/g;
  let match;
  let lastIndex = 0; // Start at the beginning

  // Loop through and capture sections
  while ((match = sectionRegex.exec(responseText)) !== null) {
    const sectionTitle = match[1].trim(); // Capture section title (text between '**')

    // If this is not the first match, capture content between the previous match and the current match
    if (lastIndex !== 0 || responseText.slice(0, match.index).trim()) {
      const sectionContent = responseText.slice(lastIndex, match.index).trim();
      const previousTitle = Object.keys(sections).pop(); // Get the previous title
      if (sectionContent && previousTitle) {
        sections[previousTitle] = sectionContent;
      }
    }

    // Add the current title to the sections
    sections[sectionTitle] = "";

    // Update lastIndex to where the current section ended
    lastIndex = match.index + match[0].length;
  }

  // Add any remaining content after the last section title
  const remainingContent = responseText.slice(lastIndex).trim();
  if (remainingContent) {
    const lastTitle = Object.keys(sections).pop(); // Get the last title
    if (lastTitle) {
      sections[lastTitle] = remainingContent;
    }
  }

  return sections;
};
