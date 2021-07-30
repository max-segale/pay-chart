import { readdir } from 'fs/promises';

export async function fileList(path, type) {
  try {
    // Get filenames in directory
    let files = await readdir(path);

    // Filter by file type
    if (type) {
      const pattern = new RegExp(`.${type}$`, 'i');
      files = files.filter((file) => {
        return file.match(pattern);
      });
    }

    return files;
  } catch (err) {
    console.error(err);
  }
}
