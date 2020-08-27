const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const webpack = require('webpack');
const cliProgress = require('cli-progress');
const exec = util.promisify(require('child_process').exec);
console.log("Deep Physics Env Builder\n");

(async () => {
    console.log("Building Environments");

    const directories = fs.readdirSync(__dirname, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name)
        .filter(d => d !== 'node_modules' && d !== 'build');

    let total = directories.length;
    let current = 0;

    let bar = new cliProgress.SingleBar({}, cliProgress.Presets.legacy);

    bar.start(total, current);

    for (let directory of directories) {
        let directoryPath = path.resolve(__dirname, directory);

        let webpackOptions = require(path.resolve(directoryPath, 'webpack.config.js'));

        const webpackPromise = () => new Promise((resolve, reject) => {
            webpack(webpackOptions, (err, stats) => {
                if(err) return reject(err);

                const info = stats.toJson();

                if (stats.hasErrors()) {
                    console.log(info.errors);
                    return reject(info.errors)
                };

                resolve(stats);
            });
        });

        await webpackPromise();

        current++;

        bar.update(current);
    }

    bar.stop();

    console.log("Moving folders to build.");

    if (fs.existsSync(path.resolve(__dirname, 'build'))) {
        fs.rmdirSync(path.resolve(__dirname, 'build'), { recursive: true });
    }

    fs.mkdirSync(path.resolve(__dirname, 'build'));

    for (let directory of directories) {
        let buildPath = path.resolve(__dirname, directory, 'build');

        fs.moveSync(buildPath, path.resolve(__dirname, 'build', directory));
    }
})();

