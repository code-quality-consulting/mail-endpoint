/*jslint
    node
*/
import assert from "assert";
import https from "https";
import parseq from "../dependencies/parseq.mjs";
import {makeServer} from "../server";
const {ML_API_KEY, CQC_GROUP_ID} = process.env;

const postData = JSON.stringify({
    email: "demo@gmail.com",
    name: "Zach and Ben",
    fields: {
        company: "MailerLite"
    }
});

const options = {
    hostname: "api.mailerlite.com",
    path: `/api/v2/groups/${CQC_GROUP_ID}/subscribers`,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(postData),
        "X-MailerLite-ApiKey": ML_API_KEY
    }
};
console.log(`api-post-request.mjs:28: Value of path: ${options.path}`);
const req = https.request(options, function (res) {
    res.setEncoding("utf8");
    let data = "";
    res.on("data", function (chunk) {
        data += chunk;
    });
    res.on("end", function () {
        let subscriberInfo = data;
        console.log(JSON.parse(subscriberInfo));
    });
});

req.on("error", (e) => console.error(`Problem with request: ${e.message}`));

req.setTimeout(5000, function () {
    console.error("No response");
});

req.write(postData);

req.end();

