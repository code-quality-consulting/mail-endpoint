/*jslint
    node
*/

import http from "http";
import fs from "fs";
import registerEmail from "./src/api-post-request";

function makeServer(environmentVariables) {
    return function serverRequestor(callback) {
        const {CQC_PORT, CQC_HOST} = environmentVariables;
        const server = http.createServer(function (req, res) {
            if (req.method === "POST") {
                let body = [];  
                // going to use different function for errors
                req.on("error", (err) => console.err(err))
                    .on("data", function (chunk) {
                        body.push(chunk);
                    }).on("end", function () {
                        body = Buffer.concat(body).toString();
                        const parsedBody = JSON.parse(body);
                        
                        res.writeHead(200, { // node keeps pointing here
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
            }
            if (req.method !== "POST") {
                res.writeHead(404, {
                    "Content-Type": "text/plain"
                });
                res.end();
            }
        }).listen(
            CQC_PORT,
            CQC_HOST,
            function () {
                callback(server);
            }
        );
    };
}

export {makeServer};
