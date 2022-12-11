var exec = require('child_process').exec;

var filePath = 'src/app.json';

exec('git diff --name-only', function(error, stdout) {
  var modifiedFiles = stdout.trim().split(/\r?\n/);
  console.log(modifiedFiles, filePath);
  if (modifiedFiles.includes(filePath)) {
    console.log('yes', `git add ${filePath}`);
    // amend last commit
    exec(`git commit --amend -C HEAD -n ${filePath}`);
  }
});
