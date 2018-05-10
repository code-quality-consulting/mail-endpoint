import assert from "assert";
import http from "http";
import querystring from "querystring";

const postData = querystring.stringify({
    "msg": "Hello world!"
});

const options = {
    hostname: "www.codequalityconsulting.com",
    port: 8347,
    path: "/post",
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData)
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding("utf8");
    res.on("data", (chunk) => console.log(`BODY: ${chunk}`));
    res.on("end", () => console.log("No more data in response")):
});

req.on("error", () => console.error(`Problem with requuest: ${e.message}`));

req.write(postDate);
req.end();


assert.strictEqual();
