/*jslint
    node
*/

import http from "http";
import url from "url";
import fs from "fs";
import path from "path";
import registerEmail from "./src/api-post-request";

function makeServer(environmentVariables) {
	console.log(environmentVariables);
    return function serverRequestor(callback, value) {
        const {CQC_PORT, CQC_HOST} = environmentVariables;
        const server = http.createServer(function (req, res) {
			const mimeType = {
		    	".ico": "image/x-icon",
                ".html": "text/html",
                ".js": "text/javascript",
                ".json": "application/json",
                ".css": "text/css",
                ".png": "image/png",
                ".jpg": "image/jpeg",
                ".wav": "audio/wav",
                ".mp3": "audio/mpeg",
                ".svg": "image/svg+xml",
                ".pdf": "application/pdf",
                ".doc": "application/msword",
                ".eot": "application/vnd.ms-fontobject",
                ".ttf": "application/font-sfnt"
			};
			const parsedUrl = url.parse(req.url);
			const sanitizePath = path.normalize(parsedUrl.pathname);
			let pathname = path.join(CQC_SERVERROOT, sanitizePath);
 
			console.log("req.url", req.url);
            if (req.method === "GET") {
                if (req.url === "/") {
                    const index =
                            "/root/mail-endpoint/assets/index.html";
                    fs.readFile(index, "utf8", function (error, file) {
                        if (error) {
                            console.log(error);
                        }
                        res.writeHead(200, {
                            "Content-Type": "text/html",
                            "X-Powered-By": "cqc"
                        });
                        res.end(file);
                    });
                }
                if (req.url === "/main.css") {
                    const css =
                            "/root/mail-endpoint/assets/main.css";
                    fs.readFile(css, "utf8", function (error, file) {
                        if (error) {
                            console.log(error);
                        }
                        res.writeHead(200, {
                            "Content-Type": "text/css",
                            "X-Powered-By": "cqc"
                        });
                        res.end(file);
                    });
                }
                if (req.url === "/main.js") {
                    const js =
                            "/root/mail-endpoint/assets/main.js";
                    fs.readFile(js, "utf8", function (error, file) {
                        if (error) {
                            console.log(error);
                        }
                        res.writeHead(200, {
                            "Content-Type": "application/javascript",
                            "X-Powered-By": "cqc"
                        });
                        res.end(file);
                    });
                }
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
                                    } = value.subscriber;
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
                callback(
                    Object.assign({server}, value)
                );
            }
        );
    };
}

export {makeServer};
