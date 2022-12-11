var path = require('path');
var exec = require('child_process').exec;

var filePath = path.resolve(__dirname, '../src/app.json');

exec('git diff --name-only', function(error, stdout, stderr) {
  var modifiedFiles = stdout.trim().split(/\r?\n/);
  console.log(modifiedFiles);
})
