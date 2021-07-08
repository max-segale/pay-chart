import { fileList } from './files.js';
import { pdfContent } from './pdf.js';
import { readStub } from './reader.js';

const path = '/Users/maxwell/Documents/paystubs';

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

fileList(path, 'pdf').then((files) => {
  const stubList = [];
  const promises = [];
  for (const file of files) {
    let promise = pdfContent(path, file).then((content) => {
      const paystub = readStub(content);
      stubList.push(paystub);
    });
    promises.push(promise);
  }
  Promise.all(promises).then(() => {
    return stubList.sort((a, b) => {
      return a.date - b.date;
    });
  }).then(payDisplay);
});