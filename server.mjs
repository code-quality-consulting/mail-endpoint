/*jslint
    node
*/

import http from "http";

function makeServer(environmentVariables) {
    return function serverRequestor(callback) {
        const server = http.createServer(function (req, res) {
            let body = [];
            req.on("error", (err) => console.err(err))
                .on("data", function (chunk) {
                    body.push(chunk);
                }).on("end", function () {
                    body = Buffer.concat(body).toString();
                    res.writeHead(200, {
                        "Content-Type": "application/json",
                        "X-Powered-By": "cqc"
                    });
                    res.write(body);
                    res.end();
                });
        }).listen(
            environmentVariables.PORT,
            environmentVariables.HOST,
            function () {
                callback(server);
            }
        );
    };
}

export {makeServer};
