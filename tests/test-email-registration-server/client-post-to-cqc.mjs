/*jslint
    node
*/
import http from "http";

export default function clientPostToCQC(
    environmentVariables,
    expectedPayload
) {
    return function testRequestor(callback, value) {

        const postData = JSON.stringify(expectedPayload);

        let {CQC_PORT, CQC_HOST} = environmentVariables;
        const options = {
            hostname: CQC_HOST,
            port: CQC_PORT,
            path: "/email-address",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(postData)
            }
        };
        const req = http.request(options, function (res) {
            res.setEncoding("utf8");
            let data = "";
            res.on("data", function (chunk) {
                data += chunk;
            })
            res.on("end", function () {
                console.log("Here is the data received back: ", data)
                callback({
                    successMessages: value.successMessages
                });
                value.server.close(() => console.log("Server closed."));
            });
        });
        req.on(
            "error",
            (e) => console.error(`Problem with request: ${e.message}`)
        );
        req.setTimeout(5000, function () {
            console.error("No response.");
        });
        req.write(postData);
        req.end();
    };
};
