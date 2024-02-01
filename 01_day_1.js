const fs = require("fs");

function readFileContent(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading file: ENOENT: no such file or directory...");
    } else {
      console.log(data);
    }
  });
}

readFileContent("test-files/file1.txt");

readFileContent("test-files/empty-file.txt");

readFileContent("test-files/nonexistent-file.txt");
