const express = require("express");
const multer = require("multer");
const path = require("path");
const fileLoader = require("./utils/fileLoader");
const RedisInterface = require("./utils/redis");

const app = express();
const port = 3000;

const redisInterface = new RedisInterface();

// Set files folder as static folder
app.use(express.static(path.join(__dirname, "files")));

app.get("/download", async (req, res, next) => {
  const fileName = req.query.fileName;

  if (!fileName) {
    return res.status(400).send("No file name specified.");
  }

  const cachedFile = await redisInterface.getFile(fileName);

  if (cachedFile !== null && cachedFile !== undefined) {
    res.status(200);
    res.send("From CACHE: \n" + cachedFile);
    return next();
  }

  const filePath = path.join(__dirname, "/files", fileName);
  const file = fileLoader(filePath);

  if (file === null || file === undefined) {
    res.status(404).send("File not found.");
    return next();
  } else {
    // redisInterface.setFile(fileName, file, 5);

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

redisInterface.connect();

if (!redisInterface.testConnection()) {
  console.log("Failed to connect to Redis server.");
  process.exit(1);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
