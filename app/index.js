import { fileList } from './files.js';
import { pdfContent } from './pdf.js';
import { readStub } from './reader.js';

function payDisplay(stubList) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  let totalGross = 0;
  stubList.forEach((paystub) => {
    totalGross += paystub.amount;
    console.log(formatter.format(totalGross), paystub.amount, paystub.company);
  });
}

function init(path) {
  // Get list of PDF files in directory
  fileList(path, 'pdf').then((files) => {
    const stubList = [];
    const promises = [];
    for (const file of files) {
      // Get text content
      let promise = pdfContent(path, file).then((content) => {
        // Create paystub object
        const paystub = readStub(content);
        stubList.push(paystub);
      });
      promises.push(promise);
    }
    // After all content has been read
    Promise.all(promises).then(() => {
      return stubList.sort((a, b) => {
        return a.date - b.date;
      });
    }).then(payDisplay);
  });
};

init('/Users/maxwell/Documents/Paystubs');