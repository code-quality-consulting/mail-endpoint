/*jslint
    node
*/
import assert from "assert";
import checkEmailAbsence from "./check-email-absence";
import registerEmail from "./api-post-request";
import parseq from "../dependencies/parseq";

function emailRegistrationAssertions(value, reason) {
    if (reason) {
        console.log("Here is the reason: ", reason);
    }
    if (value) {
        assert.strictEqual(value.email, "demo@mailerlite.com");
        console.log("Request successfully gets.");
    }
}

function testEmailRegistration(environmentVariables) {
    return parseq.sequence([
        checkEmailAbsence(environmentVariables),
        registerEmail(environmentVariables)
    ])(emailRegistrationAssertions);
}


export default testEmailRegistration;
