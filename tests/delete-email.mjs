/*jslint
    node
*/
import https from "https";

function deleteEmail(environmentVariables, userInfo) {
    return function deleteRequest(callback, successOrFailure) {
        const {email} = userInfo;
        console.log("The email ", email, userInfo);
        const {ML_PORT, ML_HOST, ML_API_KEY} = environmentVariables;
        const options = {
            hostname: ML_HOST,
            port: ML_PORT,
            path: `/api/v2/subscribers/${email}`,
            method: "DELETE",
            headers: {
                "X-MailerLite-ApiKey": ML_API_KEY
            }
        };
        const req = https.request(options, function (res) {
            res.setEncoding("utf8");
            res.on("data", function () {
                console.log("On data");
            });
            res.on("end", function () {
                if (typeof successOrFailure === "string") {
                    callback(successOrFailure);
                }
                if (Array.isArray(successOrFailure)) {
                    callback(undefined, successOrFailure);
                }
            });
        });

        req.on("error", (e) => callback(undefined, `Problem with DELETE request: ${e.message}`));

        req.setTimeout(5000, function () {
            console.error("No response");
        });

        req.end();
    };
}

export default deleteEmail;
