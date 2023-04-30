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
  return (hash = createHash("sha256").update(password).digest("hex"));
}

function queryFilter(queryObj, data) {
  /**
   * @param queryObj query object key and value { key: value }
   * @param data =>  filtered data []
   */

  return (filtered = data.filter((user) => {
    let isValid = true;

    for (key in queryObj) isValid = isValid && user[key] == queryObj[key];

    return isValid;
  }));
}

module.exports = {
  read,
  write,
  hashPasswd,
  queryFilter,
};
