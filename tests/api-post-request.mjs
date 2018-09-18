/*jslint
    node
*/
import https from "https";

function registerEmail(environmentVariables, registrationPayload) {
    return function registrationRequestor(callback) {
        const {email, name, fields} = registrationPayload;
        const postData = JSON.stringify({
            email: email,
            name: name,
            fields: fields
        });

        const {PORT, HOST, ML_API_KEY, CQC_GROUP_ID} = environmentVariables;
        const options = {
            hostname: HOST,
            port: PORT,
            path: `/api/v2/groups/${CQC_GROUP_ID}/subscribers`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(postData),
                "X-MailerLite-ApiKey": ML_API_KEY
            }
        };
        const req = https.request(options, function (res) {
            res.setEncoding("utf8");
            let data = "";
            res.on("data", function (chunk) {
                data += chunk;
            });
            res.on("end", function () {
                let subscriberInfo = data;
                callback(JSON.parse(subscriberInfo));
            });
        });

        req.on(
            "error",
            (e) => callback(
                undefined,
                `Problem with request: ${e.message}`
            )
        );

        req.setTimeout(5000, function () {
            console.error("No response");
        });

        req.write(postData);
        req.end();
    };
}
export default registerEmail;
