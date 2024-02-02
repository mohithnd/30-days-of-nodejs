const fs = require("fs");

function writeToFile(filePath, content) {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.log(
        "Error writing to file: ENOENT: no such file or directory..."
      );
    } else {
      console.log("Data written to output.txt");
    }
  });
}

writeToFile("test-files/output1.txt", "Sample content.");

writeToFile(
  "test-files/nonexistent-folder/output.txt",
  "Content in a non-existent folder."
);
