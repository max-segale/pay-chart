import { fileList } from './files.js';
import { pdfContent } from './pdf.js';
import { readStub } from './reader.js';
import { datePeriods, dateMatch } from './dates.js';
import { payDisplay } from './display.js';

const path = '/Users/maxwell/Documents/Paystubs';
const type = 'pdf';
const interval = 'month';

// Get list of PDF files in directory
fileList(path, type).then((files) => {
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
  }).then((stubList) => {
    const firstDate = stubList[0].date.valueOf();
    const lastDate = stubList[stubList.length - 1].date.valueOf();
    return datePeriods(firstDate, lastDate, interval);
  }).then((payPeriods) => {
    return dateMatch(stubList, payPeriods);
  }).then(payDisplay);
});
