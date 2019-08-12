var FtpDeploy = require("ftp-deploy");
var ftpDeploy = new FtpDeploy();

var config = {
    user: "admin_kompass@clients.kompassmedia.ca",
    password: "YlXgg6EGa-Z)",
    host: "ftp.ressourcesweb.ca",
    port: 21,
    localRoot: __dirname,
    remoteRoot: "/",
    include: ['*', '.*', '**/*'],
    exclude: ["/node_modules"],
    deleteRemote: true
};

ftpDeploy
    .on('uploading', data => console.log(data))
    .deploy(config)
    .then(res => console.log("finished:", res))
    .catch(err => console.log(err));