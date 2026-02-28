import { userInfo } from "os";
import { join } from "path";

const getBunPath = () => {
  // In some cases the Bun path is found in node_modules/.bin/bun, for avoid take this route
  // show all list of executable in the system and choice the executable that not is present
  // in node_modules
  const bunPaths = Bun.spawnSync(["which", "-a", "bun"]).stdout.toString().split("\n");
  return bunPaths
    .map(path => path.trim())
    // Choice the first executable that not is present in node_modules, if not exist return the default path
    .find(p => p && !p.includes("node_modules")) || Bun.which("bun");
}

const user = userInfo().username;
const workingDirectory = process.cwd();
const bunPath = getBunPath();
const entryPoint = join(workingDirectory, "index.ts");

const output = `
[Unit]
Description=Trader
# start the app after the network is available
After=network.target

[Service]
# usually you'll use 'simple'
# one of https://www.freedesktop.org/software/systemd/man/systemd.service.html#Type=
Type=simple
# which user to use when starting the app
User=${user}
# path to your application's root directory
WorkingDirectory=${workingDirectory}
# the command to start the app
# requires absolute paths
ExecStart=${bunPath} run ${entryPoint}
# restart policy
# one of {no|on-success|on-failure|on-abnormal|on-watchdog|on-abort|always}
Restart=always

[Install]
# start the app automatically
WantedBy=multi-user.target
  `;

await Bun.write("trader.service", output);
