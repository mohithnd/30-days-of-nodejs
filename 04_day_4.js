const path = require("path");

function resolvePath(relativePath) {
  const absolute_path = path.resolve(__dirname, relativePath);
  console.log("Resolved path: ", absolute_path);
}

resolvePath("../project/folder/file.txt");

resolvePath("nonexistent-folder/file.txt");
