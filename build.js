const path = require('path');
const fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

console.log("Deep Physics Builder\n");

(async () => {
    console.log("> Copying public and views.");
    if(fs.existsSync(path.resolve(__dirname, 'build'))) {
        fs.rmdirSync(path.resolve(__dirname, 'build'), { recursive: true });
    }

    fs.mkdirSync(path.resolve(__dirname, 'build'));

    fs.copySync(path.resolve(__dirname, 'web/public'), path.resolve(__dirname, 'build/public'));
    fs.copySync(path.resolve(__dirname, 'web/views'), path.resolve(__dirname, 'build/views'));

    console.log("> Running tsc.");

    await exec('tsc');

    console.log("> Building environments.");

    await exec(`cd "${path.resolve(__dirname, 'environments')}" && npm run build`);

    console.log("> Copying environments.");

    fs.copySync(path.resolve(__dirname, 'environments/build'), path.resolve(__dirname, 'build/public/environments'));

    console.log("\nDONE!");
})();

