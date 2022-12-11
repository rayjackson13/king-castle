var exec = require('child_process').exec;

var filePath = 'src/app.json';

exec('git diff --name-only', function(error, stdout) {
  var modifiedFiles = stdout.trim().split(/\r?\n/);
  if (modifiedFiles.includes(filePath)) {
    // amend last commit
    exec(`git commit --amend -C HEAD -n ${filePath}`);
  }
});
