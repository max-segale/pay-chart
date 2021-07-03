const { readdir } = require('fs/promises');

exports.fileList = async (path, type) => {
  try {
    
    // Get filenames in folder
    let files = await readdir(path);

    // Filter by file type
    if (type) {
      files = files.filter((file) => {
        return file.endsWith(`.${type}`);
      });
    }

    return files;
    
  } catch (err) {
    console.error(err);
  }
};