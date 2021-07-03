const pdfjsLib = require('pdfjs-dist/es5/build/pdf.js');

exports.pdfContent = async (path, file) => {

  // Get document content
  const loadingTask = pdfjsLib.getDocument(`${path}/${file}`);

  // Wait for document load
  const content = await loadingTask.promise.then((pdf) => {

    // Return text from page
    return pdf.getPage(1).then((page) => {
      return page.getTextContent().then((textContent) => {
        return textContent;
      });
    });
  }).catch((err) => {
    console.error(err);
  })

  return content;

};