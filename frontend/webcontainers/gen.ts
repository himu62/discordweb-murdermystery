import * as fs from "node:fs";

const destPath = "./dist/files.js";

fs.writeFileSync(
  destPath,
  `const files = {
  "index.ts": {
    file: {
      contents: \`${fs.readFileSync("./src/index.ts").toString()}\`
    }
  },
  "package.json": {
    file: {
      contents: \`${fs.readFileSync("./package.json").toString()}\`
    }
  },
  "package-lock.json": {
    file: {
      contents: \`${fs.readFileSync("./package-lock.json").toString()}\`
    }
  }
};
export default files;`
);
console.log(`wrote to ${destPath}`);
