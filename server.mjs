/*jslint
    node
*/

import http from "http";

function serverRequestor(callback) {
    const server = http.createServer(function (req, res) {
        let body = [];
        req.on("error", (err) => console.err(err))
            .on("data", function (chunk) {
                body.push(chunk);
                console.log(body);
            }).on("end", function () {
                body = Buffer.concat(body).toString();
                console.log(body);
                res.writeHead(200, {
                    "Content-Type": "application/json",
                    "X-Powered-By": "cqc"
                });
                res.write(body);
                res.end();
            });
    }).listen(3001, function () {
        callback(server);
    });
}

export {serverRequestor};
