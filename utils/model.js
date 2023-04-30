const { readFileSync, writeFileSync } = require("fs");
const { resolve } = require("path");
const { createHash } = require("crypto");

function read(fileName) {
  return JSON.parse(readFileSync(resolve("database", fileName + ".json")));
}

function write(fileName, data) {
  writeFileSync(
    resolve("database", fileName + ".json"),
    JSON.stringify(data, null, 2)
  );
  return true;
}

function hashPasswd(password) {
  return hash = createHash("sha256").update(password).digest("hex");
}

function queryFilter(key, value, data) {
  return (filtered = data.filter((item) => item[key] == value));
}

module.exports = {
  read,
  write,
  hashPasswd,
  queryFilter,
};
