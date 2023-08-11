import http from "k6/http";
import { sleep } from "k6";

export default function () {
  // const fileNames = [
  //   "5a2e_1099/config.yaml",
  //   "5a2e_1099/train.log",
  //   "5a2e_1099/metadata.json",
  //   "5a2e_1099/results.json",
  //   "5a2e_1099/checkpoints/MyModel_0000007504.pt",
  //   "5a2e_1099/checkpoints/MyModel_0000008442.pt",
  //   "5a2e_1099/checkpoints/MyModel_0000009380.pt",
  //   "somethingNotExist.json",
  // ];

  // let randomIndex = Math.floor(Math.random() * fileNames.length);

  // const url = `http://localhost:3000/download?fileName=${fileNames[randomIndex]}`;

  const url = `http://localhost:3000/download?fileName=largeFile_1GB.json`;

  // 发送 GET 请求
  const response = http.get(url);

  // 输出请求结果
  // console.log(`Response status code: ${response.status}`);
  // console.log(`Response body: ${response.body}`);

  // 模拟请求之间的延迟
  sleep(0.1); // 1 秒
}
