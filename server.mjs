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
        const {CQC_PORT, CQC_HOST, CQC_SERVERROOT} = environmentVariables;
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
			if (req.method === "GET") {
				fs.exists(pathname, function (exist) {
					if (!exist) {
						res.statusCode = 404;
						res.end(`File ${pathname} not found!`);
						return;
					}
					if (fs.statSync(pathname).isDirectory()) {
						pathname += "assets/index.html";
					}
					fs.readFile(pathname, function (err, file) {
						if (err) {
							res.statusCode = 500;
							res.end(`Error getting the file: ${err}`);
						}
						const ext = path.parse(pathname).ext;
						res.setHeader(
							"Content-Type",
							mimeType[ext] || "text/plain"
						);
						res.end(file);
					});
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
