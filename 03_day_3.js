const child_process = require("child_process");

function executeCommand(command) {
  child_process.exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(stderr);
      return;
    }
    console.log(stdout);
  });
}

executeCommand("ls -la");

executeCommand('echo "Hello, Node.js!"');
