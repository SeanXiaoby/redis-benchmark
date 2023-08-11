const chai = require("chai");
const expect = chai.expect;
const RedisInterface = require("../utils/redis"); // 根据你的文件路径调整

describe("RedisInterface", function () {
  let redisInterface;

  beforeEach(function () {
    redisInterface = new RedisInterface();
    redisInterface.connect();
  });

  afterEach(function () {
    redisInterface.quit();
  });

  it("should be connected to the redis server", async function () {
    const isConnected = await redisInterface.testConnection();
    expect(isConnected).to.be.true;
  });

  it("should set and get a file", async function () {
    const filePath = "testFile";
    const fileData = "Test data";
    const ttlMinutes = 5;

    await redisInterface.setFile(filePath, fileData, ttlMinutes);
    const retrievedData = await redisInterface.getFile(filePath);

    expect(retrievedData).to.equal(fileData);
  });

  it("return null if file not exist", async function () {
    const filePath = "otherFile";

    const retrievedData = await redisInterface.getFile(filePath);

    expect(retrievedData).to.be.null;
  });

  it("should delete a file", async function () {
    const filePath = "testFile";
    const fileData = "Test data";
    const ttlMinutes = 5;

    await redisInterface.setFile(filePath, fileData, ttlMinutes);
    await redisInterface.deleteFile(filePath);

    const retrievedData = await redisInterface.getFile(filePath);

    expect(retrievedData).to.be.null;
  });

  it("should update a file", async function () {
    const filePath = "testFile";
    const fileData = "Updated data";
    const ttlMinutes = 5;

    await redisInterface.updateFile(filePath, fileData, ttlMinutes);

    const retrievedData = await redisInterface.getFile(filePath);
    expect(retrievedData).to.equal(fileData);
  });
});
