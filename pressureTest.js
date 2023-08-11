import http from "k6/http";
import { sleep } from "k6";

export default function () {
  const fileNames = [
    "5a2e_1099/config.yaml",
    "5a2e_1099/train.log",
    "5a2e_1099/metadata.json",
    "5a2e_1099/results.json",
    "5a2e_1099/checkpoints/MyModel_0000007504.pt",
    "5a2e_1099/checkpoints/MyModel_0000008442.pt",
    "5a2e_1099/checkpoints/MyModel_0000009380.pt",
    "somethingNotExist.json",
  ];

  let randomIndex = Math.floor(Math.random() * fileNames.length);

  const url = `http://localhost:3000/download?fileName=${fileNames[randomIndex]}`;

  // const url = `http://localhost:3000/download?fileName=largeFile_1GB.json`;

  // Send http request
  const response = http.get(url);

  // Outputs req results
  // console.log(`Response status code: ${response.status}`);
  // console.log(`Response body: ${response.body}`);

  // Simulate user's wait time
  sleep(0.1);
}
