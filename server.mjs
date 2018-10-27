/*jslint
    node
*/

import http from "http";
import fs from "fs";
import registerEmail from "./src/api-post-request";
import initializeMessages from "./library/initialize-messages";

function makeServer(environmentVariables) {
    return function serverRequestor(callback, value) {
        const {CQC_PORT, CQC_HOST} = environmentVariables;
        const server = http.createServer(function (req, res) {
            if (req.method === "GET") {
                res.writeHead(200, {
                    "Content-Type": "text/html",
                    "X-Powered-By": "cqc"
                });
                const index = "/home/cqc/projects/homepage/carrd/index.html";
                fs.readFile(index, "utf8", function (error, file) {
                    if (error) {
                        console.log(error);
                    }
                    res.end(file);
                });
            }
            if (req.method === "POST") {
                let body = [];
                req.on("error", (err) => console.err(err))
                    .on("data", function (chunk) {
                        body.push(chunk);
                    }).on("end", function () {
                        body = Buffer.concat(body).toString();
                        const parsedBody = JSON.parse(body);
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
                                    res.writeHead(200, {
                                        "Content-Type": "application/json",
                                        "X-Powered-By": "cqc"
                                    });
                                    res.write(JSON.stringify(user));
                                    res.end();
                                }
                                if (reason) {
                                    const {error} = reason;
                                    res.write(error.message);
                                    res.end();
                                }
                            }
                        );
                    });
            }
        }).listen(
            CQC_PORT,
            CQC_HOST,
            function () {
                initializeMessages(
                    callback,
                    Object.assign({server}, value)
                );
                /*if (value) {
                    if (Array.isArray(value.successMessages)) {
                        return callback({
                            server,
                            successMessages: [
                                ...value.successMessages
                            ]
                        });
                    }
                }
                callback(server);*/
            }
        );
    };
}

export {makeServer};
