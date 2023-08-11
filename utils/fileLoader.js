const fs = require("fs");

const fileLoader = (path) => {
  try {
    const file = fs.readFileSync(path);

    return file;
  } catch (err) {
    if (err) {
      console.log("File Loader Error");
      return null;
    }
  }
};

module.exports = fileLoader;
