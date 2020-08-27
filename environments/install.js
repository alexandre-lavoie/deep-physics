const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const cliProgress = require('cli-progress');
const exec = util.promisify(require('child_process').exec);

console.log("Deep Physics Env Installer\n");

(async () => {
    console.log("Installing Environments");

    const directories = fs.readdirSync(__dirname, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .filter(d => d !== 'node_modules' && d !== 'build');

    let total = directories.length;
    let current = 0;

    let bar = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);

    bar.start(total, current);

    for(let directory of directories) {
        let directoryPath = path.resolve(__dirname, directory);

        await exec(`cd "${directoryPath}" && npm install`);

        current++;

        bar.update(current);
    }

    bar.stop();
})();

