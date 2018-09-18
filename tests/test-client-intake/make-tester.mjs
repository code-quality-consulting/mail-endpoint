/*jslint
    node
*/
import http from "http";

export default function makeTester(environmentVariables, expectedPayload) {
    return function testRequestor(callback, server) {

        const postData = JSON.stringify(expectedPayload);

        let {PORT, HOST} = environmentVariables;
        const options = {
            hostname: HOST,
            port: PORT,
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
            });
            res.on("end", function () {
                let subscriberInfo = data;
                callback(JSON.parse(subscriberInfo));
                server.close(() => console.log("Server closed."));
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
