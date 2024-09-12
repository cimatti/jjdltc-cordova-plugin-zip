const AdmZip = require('adm-zip');
const path = require('path');

function url2path(url) {
    if (url.substr(0, 8) === 'file:///') {
        if (process.platform === 'win32' && (/^file:\/\/\/[a-z]:\//i).test(url)) {
            url = url.substr(8);
        }
        else {
            url = url.substr(7);
        }
    }
    return url;
}

module.exports = {
    zip: function([file, options]) { // eslint-disable-line no-unused-vars
        return new Promise(function(resolve,reject) {
            console.log("zip method not yet implemented for Electron");
            reject({
                success: false,
                message: "compress Operation fail"
            });
        });
    },
    unzip: function([file, options]) {
        return new Promise(function(resolve,reject) {
            try {
                const zipPath = path.resolve(url2path(file));
                const targetPath = path.resolve(url2path(options.target));
                const zip = new AdmZip(zipPath);
                zip.extractAllTo(targetPath, true);
                resolve({
                    success: true,
                    message: "decompress Operation success"
                });
            }
            catch (e) {
                console.log("unzip failed");
                console.log(e);
                reject({
                    success: false,
                    message: "decompress Operation fail"
                });
            }
        });
    }
}
