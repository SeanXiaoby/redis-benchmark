const redis = require("redis");

class RedisInterface {
  constructor() {
    this.client = redis.createClient({
      host: "127.0.0.1",
      port: 6379,
    });
    this.client.on("error", (err) => console.log("Redis Client Error", err));
    this.isConnected = false;
  }

  async connect() {
    await this.client.connect();
    console.log("Redis Client Connected");

    this.isConnected = true;
  }

  async quit() {
    await this.client.quit();
    console.log("Redis Client quited");
  }

  async testConnection() {
    const pong = await this.client.ping();
    if (pong === "PONG") {
      console.log("Test connection: Redis Client Connected");
      return true;
    } else {
      console.log("Test connection: Redis Client Error");
      return false;
    }
  }

  async setFile(filePath, fileData, ttlMinutes) {
    await this.client.setEx(filePath, ttlMinutes * 60, fileData);
    // console.log("Redis Client Set");
  }

  async getFile(filePath) {
    const fileData = await this.client.get(filePath);
    // console.log("Redis Client Get");
    return fileData;
  }

  async updateFile(filePath, fileData, ttlMinutes) {
    await this.client.setEx(filePath, ttlMinutes * 60, fileData);
    // console.log("Redis Client Updated");
  }

  async deleteFile(filePath) {
    await this.client.del(filePath);
    // console.log("Redis Client Deleted");
  }

  async getFileList() {
    const fileList = await this.client.keys("*");
    // console.log("Redis Client Get", fileList);
    return fileList;
  }
}

module.exports = RedisInterface;
