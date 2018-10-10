/*jslint
    node
*/

import http from "http";
import fs from "fs";
import registerEmail from "./src/api-post-request";

function makeServer(environmentVariables) {
    return function serverRequestor(callback) {
        // fs.readFile() needs to be used somewhere 

        const server = http.createServer(function (req, res) {
            let body = [];
            req.on("error", (err) => console.err(err))
                .on("data", function (chunk) {
                    body.push(chunk);
                }).on("end", function () {
                    body = Buffer.concat(body).toString();
                    const parsedBody = JSON.parse(body);
                    res.writeHead(200, {
                        "Content-Type": "application/json",
                        "X-Powered-By": "cqc"
                    });
                    registerEmail(environmentVariables, parsedBody)(
                        function (value, reason) {
                            if (value) {
                                const {
                                    name,
                                    email,
                                    id
                                } = value;
                                const user = {
                                    name,
                                    email,
                                    id
                                };
                                res.write(JSON.stringify(user));
                                res.end();
                            }
                            if (reason) {
                                const {error} = reason;
                                console.log(reason);
                                res.write(error.message);
                                res.end();
                            }
                        }
                    );
                });
        }).listen(
            environmentVariables.CQC_PORT,
            environmentVariables.CQC_HOST,
            function () {
                callback(server);
            }
        );
    };
}

export {makeServer};
