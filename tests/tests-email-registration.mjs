/*jslint
    node
*/
import assert from "assert";
import checkEmailAbsence from "./check-email-absence";
import registerEmail from "./api-post-request";
import deleteEmail from "./api-delete-request";
import parseq from "../dependencies/parseq";

const {ML_HOST, ML_PORT, ML_API_KEY} = process.env;

function emailRegistrationAssertions(value, reason) {
    if (reason) {
        console.error(reason);
    }
    if (value) {
        assert.strictEqual(value.email, "demo@cqc.com");
    }
    // then deletes email
    deleteEmail({PORT: ML_PORT, HOST: ML_HOST, ML_API_KEY})(
        function (value, reason) {
            if (reason) {
                console.error(reason);
            }
            if (value) {
                console.log(value);
            }
        }
    );
}

// checks for email with GET
// then posts email
function testEmailRegistration(environmentVariables) {
    return parseq.sequence([
        checkEmailAbsence(environmentVariables),
        registerEmail(environmentVariables)
    ])(emailRegistrationAssertions);
}


export default testEmailRegistration;
