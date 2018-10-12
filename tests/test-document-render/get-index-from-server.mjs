import http from "http";
import fs from "fs";

export default function getIndexFromServer(environmentVariables) {
    return function testRequestor(callback, server) {
        const {CQC_PORT, CQC_HOST} = environmentVariables;
        const options = {
            path: "/",
            hostname: CQC_HOST,
            port: CQC_PORT,
            headers: {
                "Content-Type": "text/html"
            }
        }; //does server need to be used up here?
        const req = http.get(
            options,
            function (res) {
                // method is null right now
                console.log("line 18 getindex: res", res.method)
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
                    callback(res);
                    server.close();
                    return;
                }

                res.setEncoding('utf8');
                callback(res);
            }
        )
    }
}
