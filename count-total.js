const fs = require("fs");
const path = require("path");

function countLinesInFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  return fileContent.split("\n").length;
}

function countLinesInDirectory(dirPath) {
  let totalLines = 0;
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      totalLines += countLinesInDirectory(fullPath);
    } else if (entry.isFile() && path.extname(entry.name) === ".js") {
      totalLines += countLinesInFile(fullPath);
    }
  }

  return totalLines;
}

const totalLines = countLinesInDirectory("./");
console.log(`Total lines in the project: ${totalLines}`);
