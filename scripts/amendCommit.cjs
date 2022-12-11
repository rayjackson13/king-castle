var path = require('path');
var exec = require('child_process').exec;

var filePath = path.resolve(__dirname, '../src/app.json');

exec('git diff --name-only', function(error, stdout) {
  var modifiedFiles = stdout.trim().split(/\r?\n/);
  console.log(modifiedFiles);
  if (modifiedFiles.includes(filePath)) {
    console.log('yes');
    // amend last commit
    exec(`git commit --amend -C HEAD -n ${filePath}`);
  }
});
