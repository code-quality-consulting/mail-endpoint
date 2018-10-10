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

        const {
            ML_PORT,
            ML_HOST,
            ML_API_KEY,
            CQC_GROUP_ID
        } = environmentVariables;
        
        const options = {
            hostname: ML_HOST,
            port: ML_PORT,
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
                let subscriberInfo = JSON.parse(data);
                console.log("api-post-req: line 43: subInfo: ", subscriberInfo);
                if (subscriberInfo.error) {
                    callback(undefined, subscriberInfo);
                }
                if (!subscriberInfo.error) {
                    callback(subscriberInfo);
                }
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
