import http from "http";
import fs from "fs";

export default function getJsFromServer(environmentVariables) {
    return function testRequestor(callback, value) {
        const {CQC_PORT, CQC_HOST} = environmentVariables;
        const options = {
            path: "/main.js",
            hostname: CQC_HOST,
            port: CQC_PORT
        };
        const req = http.get(
            options,
            function (res) {
                const {statusCode} = res;
                const contentType = res.headers["content-type"];
                res.setEncoding("utf8");
                let data = "";
                res.on("data", function (chunk) {
                    data += chunk;
                });
                res.on("end", function () {
                    data = data.substring(0, 8);
                    callback(
                        Object.assign(
                            {
                                statusCode,
                                contentType,
                                data
                            },
                            value
                        )
                    );
                });
                value.server.close();
            }
        )
    }
}
