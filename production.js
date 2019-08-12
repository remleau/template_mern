var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();

var config = {
    user: "",
    password: "",
    host: "",
    port: 21,
    localRoot: __dirname + "/dist",
    remoteRoot: "/",
    include: ['*', '.*', '**/*'],
    exclude: ["data/*.json", "admin/.htaccess"],
    deleteRemote: false
};

ftpDeploy
    .on('uploading', data => console.log(data))
    .deploy(config)
    .then(res => console.log("finished:", res))
    .catch(err => console.log(err));