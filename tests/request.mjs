/*jslint
    node
*/
import assert from "assert";
import http from "http";
import parseq from "../dependencies/parseq.mjs";
import {serverRequestor} from "../server";

function testRequest(value, reason) {
    if (reason) {
        console.error(reason);
    }
    if (value) {
        assert.strictEqual(value, `{"msg":"Hello world!"}`);
        console.log("Request successfully posts.");
    }
}

function testRequestor(callback, server) {
    const postData = JSON.stringify({
        "msg": "Hello world!"
    });

    const options = {
        hostname: "127.0.0.1",
        port: 3001,
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
            callback(data);
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

}

function testPostServer() {
    parseq.sequence([serverRequestor, testRequestor])(testRequest);
}

export default testPostServer;
