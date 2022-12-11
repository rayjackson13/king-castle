var path = require('path');
var fs = require('fs');

var filePath = path.resolve(__dirname, '../src/app.json');

function loadJSONFromFile() {
  var contents = fs.readFileSync(filePath).toString();
  return JSON.parse(contents);
}

function updateVersion(json) {
  var version = json.version;
  var versionSplit = version.split('.');
  var buildVersion = Number(versionSplit[2]);
  versionSplit[2] = buildVersion + 1;
  json.version = versionSplit.join('.');
  return JSON.stringify(json, null, 2);
}

var json = loadJSONFromFile();
var contents = updateVersion(json);
fs.writeFileSync(filePath, contents);
