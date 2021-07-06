import { fileList } from './files.js';
import { pdfContent } from './pdf.js';
import { payRead } from './paystub.js';

const path = '/Users/maxwell/Documents/paystubs';
const payList = [];

// Get PDF filename array
fileList(path, 'pdf').then((files) => {

  const promises = [];
  
  for (const file of files) {

    // Get text content from file
    let promise = pdfContent(path, file).then((content) => {

      // Read text content, create object
      const paystub = payRead(content);

      payList.push(paystub);

    });

    promises.push(promise);

  }

  // After all files have been read
  Promise.all(promises).then(() => {
    let totalGross = 0;

    payList.sort((a, b) => {
      return a.date - b.date;
    });

    // Create our number formatter.
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    payList.forEach((paystub) => {
      totalGross += paystub.amount;

      console.log(formatter.format(totalGross), paystub.amount, paystub.company);
    });
  });

});