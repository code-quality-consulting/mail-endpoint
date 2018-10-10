import http from "http";
import fs from "fs";

export default function getIndexFromServer(environmentVariables) {
    return function testRequestor(callback) {
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

                let error;
                if (statusCode !== 200) {
                    error = new Error("Request Failed.\n" +
                      `Status Code: ${statusCode}`);
                } else if (!/^text\/html/.test(contentType)) {
                    error = new Error("Invalid content-type.\n" +
                      `Expected text/html but received ${contentType}`
                    );
                }
                if (error) {
                    console.error(error.message);
                    // consume response data to free up memory
                    res.resume();
                    return;
                }

                res.setEncoding('utf8');
                callback(res);
            }
        )
    }
}
