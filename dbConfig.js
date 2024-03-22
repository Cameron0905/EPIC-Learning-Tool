const mysql = require('mysql2/promise');
const { Client } = require('ssh2');
const sshClient = new Client();
const dbServer = {
    host: 'cs-db.ncl.ac.uk',
    port: 3306,
    user: 't2033t47',
    password: 'Pin4Dame.Few',
    database: 't2033t47'
}
const tunnelConfig = {
    host: 'linux.cs.ncl.ac.uk',
    port: 22,
    username: 'b9036875',
    password: 'Cheekyduck1'
}
const forwardConfig = {
    srcHost: '127.0.0.1',
    srcPort: 33046,
    dstHost: dbServer.host,
    dstPort: dbServer.port
};
const SSHConnection = new Promise((resolve, reject) => {
    sshClient.on('ready', () => {
        sshClient.forwardOut(
        forwardConfig.srcHost,
        forwardConfig.srcPort,
        forwardConfig.dstHost,
        forwardConfig.dstPort,
        (err, stream) => {
             if (err) reject(err);
             const updatedDbServer = {
                 ...dbServer,
                 stream
            };
            resolve(mysql.createConnection(updatedDbServer));
        });
    }).connect(tunnelConfig);
});
module.exports = SSHConnection;
