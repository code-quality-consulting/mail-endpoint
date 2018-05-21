/*jslint
    node
*/
import assert from "assert";
import http from "http";
import server from "../server";

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
        assert.strictEqual(data, `{"msg":"Hello world!"}`);
        console.log("Success");
        server.close(() => console.log("Server closed."));
    });
});
req.on("error", (e) => console.error(`Problem with request: ${e.message}`));
req.setTimeout(5000, function () {
    console.error("No response.");
});
req.write(postData);
req.end();

