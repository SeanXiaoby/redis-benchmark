const express = require("express");
const path = require("path");
const fileLoader = require("./utils/fileLoader");
const NodeCache = require("node-cache");

const app = express();
const port = 3000;
const cache = new NodeCache({ stdTTL: 60 });

// Set files folder as static folder
app.use(express.static(path.join(__dirname, "files")));

app.get("/download", async (req, res, next) => {
  const fileName = req.query.fileName;

  if (!fileName) {
    return res.status(400).send("No file name specified.");
  }

  if (cache.has(fileName)) {
    res.status(200);
    res.send("From CACHE: \n" + cache.get(fileName));
    return next();
  }

  const filePath = path.join(__dirname, "/files", fileName);
  const file = fileLoader(filePath);

  if (file === null || file === undefined) {
    res.status(404).send("File not found.");
    return next();
  } else {
    cache.set(fileName, file);

    res.status(200);
    res.send("From LOCAL: \n" + file);
    return next();
  }
});

app.use(async (req, res, next) => {
  // Decide if the res has been sent
  if (res.headersSent) {
    return next();
  }

  // Send the response
  res.status(404).send("Request not found");
  next();
});

app.use(async (req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Entry point

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
