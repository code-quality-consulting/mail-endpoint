/*jslint
    node
*/
import http from "http";
import parseq from "../dependencies/parseq.mjs";
import assertionLogger from "./assertion-logger";
import {makeServer} from "../server";

/* maybe use for testing the payload
function checkPostRequest(request, payload = []) {
    console.log("here is request: ", request);
    const postBody = Object.keys(request);
    console.log("here is post body: ", postBody);
    const unauthorizedData = postBody.filter((data) =>
        !payload.includes(data)
    );
    console.log("unauthorized data: ", unauthorizedData);
    if (unauthorizedData.length === 0) {
        return false;
    }
    return true;
}
*/

function testRequest(value, reason) {
    const assertions = {
        "Incorrect email address": {
            expect: typeof(value.email) === "string"
                    && value.email === "pseudouser@pseudodomains.com",
            toEqual: true,
            actualValue: value.email
        },
        "Incorrect group": {
            expect: typeof(value.groups[0]) === "string"
                    && value.groups[0] === "tdd",
            toEqual: true,
            actualValue: value.groups[0]
        },
        "Incorrect first name": {
            expect: typeof(value.firstName) === "string"
                    && value.firstName === "Pseudo",
            toEqual: true,
            actualValue: value.firstName
        },
        "Incorrect last name": {
            expect: typeof(value.lastName) === "string"
                    && value.lastName === "User",
            toEqual: true,
            actualValue: value.lastName
        }
    };
    assertionLogger(assertions, reason, value);
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
}

function testPostServer(environmentVariables) {
    parseq.sequence([makeServer(environmentVariables), makeTester(environmentVariables)])(testRequest);
}

export default testPostServer;
