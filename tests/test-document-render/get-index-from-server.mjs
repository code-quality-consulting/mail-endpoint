import http from "http";
import fs from "fs";

export default function getIndexFromServer(environmentVariables) {
    return function testRequestor(callback, {server}) {
        const {CQC_PORT, CQC_HOST} = environmentVariables;
        const options = {
            path: "/",
            hostname: CQC_HOST,
            port: CQC_PORT,
            headers: {
                "Content-Type": "text/html"
            }
        }; 
        const req = http.get(
            options,
            function (res) {
                const { statusCode } = res;
                const contentType = res.headers["content-type"];
                res.setEncoding("utf8");
                let data = ""; 
                res.on("data", function (chunk) {
                    data += chunk;
                });
                res.on("end", function () {
                    data = data.substring(0, 15);
                    callback({
                        statusCode,
                        contentType,
                        data
                    });
                });
                server.close();
            }
        )
    }
}
