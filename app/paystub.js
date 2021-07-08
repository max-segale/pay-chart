class Paystub {
  constructor() {
    this.type = null;
    this.company = null;
    this.date = null;
    this.amount = null;
    this.hours = null;
  }

  addType(id) {
    switch(id) {
      case '3022647439':
        this.type = 'ROBERT_HALF';
        break;
      case '3660856':
        this.type = 'INSPERITY';
        break;
    }
  }

  addCompany(company) {
    switch(company) {
      case 'Cure':
        this.company = 'FCBCure';
        break;
      case 'LIFETIME':
        this.company = 'LTV';
        break;
      default:
        this.company = company;
    }
  }

  addDate(date) {
    this.date = new Date(date);
  }

  addAmount(amount) {
    this.amount = parseFloat(amount.replace(/,/g, ''));
  }

  addHours(hours) {
    this.hours = parseFloat(hours);
  }
}

export function stubRead(content) {
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
  for (let l = 0; l < linePos.length; l += 1) {
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
    if (paystub.type === 'ROBERT_HALF') {
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
    } else if (paystub.type === 'INSPERITY') {
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