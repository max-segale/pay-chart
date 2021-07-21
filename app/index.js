import { fileList } from './files.js';
import { pdfContent } from './pdf.js';
import { readStub } from './reader.js';
import { datePeriods, dateMatch } from './dates.js';
import { payDisplay } from './display.js';

(function () {
  const path = '/Users/maxwell/Documents/Paystubs';
  const type = 'pdf';
  const interval = 'month';
  const paystubs = [];
  const addStub = (content) => {
    const paystub = readStub(content);
    paystubs.push(paystub);
  };
  const sortDates = () => {
    paystubs.sort((a, b) => a.date - b.date);
    const firstDate = paystubs[0].date.valueOf();
    const lastDate = paystubs[paystubs.length - 1].date.valueOf();
    const payPeriods = datePeriods(firstDate, lastDate, interval);
    return dateMatch(paystubs, payPeriods);
  };
  const processContent = () => {
    const payDates = sortDates();
    payDisplay(payDates, interval);
  };
  const readFiles = (files) => {
    const promises = [];
    for (const file of files) {
      let promise = pdfContent(path, file).then(addStub);
      promises.push(promise);
    }
    Promise.all(promises).then(processContent);
  };

  // Get files in directory, read content
  fileList(path, type).then(readFiles);
}());