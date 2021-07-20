import { Paystub } from './paystub.js';

export function readStub(content) {
  // Filter out blank text items
  const contentItems = content.items.filter((item) => {
    const text = item.str.trim();
    return text !== '';
  }).map((item) => {
    // Extract relevant content
    return {
      text: item.str.replace(/\s+/g, ' ').trim(),
      x: parseInt(item.transform[4]),
      y: parseInt(item.transform[5])
    };
  });
  // Arrange text items into lines
  const lineText = {};
  for (const item of contentItems) {
    if (lineText[item.y]) {
      lineText[item.y].push(item.text);
    } else {
      lineText[item.y] = [item.text];
    }
  }
  // Sort lines into descending order
  const linePos = Object.keys(lineText);
  linePos.sort((a, b) => {
    return b - a;
  });
  // Create new paystub object
  const paystub = new Paystub();
  // Loop through lines of text
  for (let l = 0; l < linePos.length; l++) {
    let thisLine = lineText[linePos[l]];
    let nextLine = lineText[linePos[l + 1]];
    let lineStart = thisLine[0];
    let idItem = thisLine.find((item) => {
      return item.startsWith('Employee ID:');
    });
    // Set type based on id number
    if (idItem) {
      paystub.addType(idItem.split(' ')[2]);
    }
    // Find data based on type
    if (paystub.type === 'robert_half') {
      if (lineStart === 'Week Begin Dt') {
        paystub.addDate(nextLine[1]);
        paystub.addCompany(nextLine[2].split(' ')[0]);
        if (nextLine.length === 5) {
          paystub.addAmount(nextLine[3]);
        } else {
          paystub.addHours(nextLine[4]);
          paystub.addAmount(nextLine[5]);
        }
      }
    } else if (paystub.type === 'insperity') {
      if (lineStart.startsWith('Company:')) {
        paystub.addCompany(lineStart.split(' ')[2]);
      } else if (thisLine[1]?.startsWith('Pay Period:')) {
        paystub.addDate(thisLine[1].split(' ')[4]);
      } else if (lineStart.startsWith('Gross Earnings:')) {
        paystub.addAmount(lineStart.split (' ')[2]);
      }
    }
    // Finish after all important data found
    if (paystub.type && paystub.company && paystub.date && paystub.amount) {
      break;
    }
  }
  return paystub;
}