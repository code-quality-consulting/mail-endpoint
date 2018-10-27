/*jslint
    node
*/
import http from "http";

export default function makeTester(environmentVariables, expectedPayload) {
    return function testRequestor(callback, value) {
        console.log("Here's the expected payload.", expectedPayload);

        const postData = JSON.stringify(expectedPayload);

        const {CQC_PORT, CQC_HOST} = environmentVariables;
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
            });
            res.on("end", function () {
                let subscriberInfo = data;
                subscriberInfo = JSON.parse(subscriberInfo);
                console.log("What is sent from makeTester: ", {
                    subscriber: subscriberInfo,
                    successMessages: value.successMessages
                });
                callback({
                    subscriber: subscriberInfo,
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
