
const crossSpawn = require("child_process").spawn;

function kill() {
  const platform = process.platform;
  if (platform === "win32") {
    crossSpawn("taskkill", ["/F", "/T", "/PID", this.pid]);
  } else {
    crossSpawn.kill(this.pid);
  }
}
 
module.exports = function spawn(command, args, options) {
  const child = crossSpawn(command, args, options);
  child.kill = kill;

  return child;
}
 