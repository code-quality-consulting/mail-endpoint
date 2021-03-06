/*jslint
    node
*/
import assert from "assert";
import http from "http";
import parseq from "../dependencies/parseq.mjs";
import {makeServer} from "../server";

function testRequest(value, reason) {
    if (reason) {
        console.error(reason);
    }
    if (value) {
        assert.strictEqual(value.email, "pseudouser@pseudodomains.com");
        assert.strictEqual(value.groups[0], "tdd");
        assert.strictEqual(value.firstName, "Pseudo");
        assert.strictEqual(value.lastName, "User");
        console.log("Request successfully posts.");
    }
}

function makeTester(environmentVariables) {
    return function testRequestor(callback, server) {
        const postData = JSON.stringify({
            email: "pseudouser@pseudodomains.com",
            groups: ["tdd"],
            firstName: "Pseudo", 
            lastName: "User"
        });
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
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding("utf8");
            let data = "";
            res.on("data", function (chunk) {
                console.log("Here's a chunk: ", chunk);
                data += chunk;
            });
            res.on("end", function () {
                let subscriberInfo = data
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
}

function testPostServer(environmentVariables) {
    parseq.sequence([makeServer(environmentVariables), makeTester(environmentVariables)])(testRequest);
}

export default testPostServer;
