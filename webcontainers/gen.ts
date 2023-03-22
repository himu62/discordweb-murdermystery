import * as fs from "node:fs";

const sourcePath = "./dist/index.js";
const destPath = "./dist/files.js";

if (!fs.existsSync(sourcePath)) {
  console.error(`not found ${sourcePath}`);
}

const data = fs.readFileSync(sourcePath);

fs.writeFileSync(
  destPath,
  `const files = {
  "index.js": {
    file: {
      contents: \`${data.toString()}\`
    }
  }
};
export default files;`
);
console.log(`wrote to ${destPath}`);
