var path = require('path');
var exec = require('child_process').exec;

var filePath = path.resolve('../src/app.json');

exec('git diff --name-only', function(error, stdout) {
  var modifiedFiles = stdout.trim().split(/\r?\n/);
  console.log(modifiedFiles);
  if (modifiedFiles.includes(filePath)) {
    console.log('yes', `git add ${filePath}`);
    // amend last commit
    exec(`git add ${filePath}`, function(error, output) { console.log(output); });
    exec(`git status`, function(error, output) { console.log(output); });
    exec(`git commit --amend`);
  }
});
