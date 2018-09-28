/*jslint
    node
*/

import checkEmailAbsence from "../check-email-absence";
import registerEmail from "../../src/api-post-request";
import emailRegistrationAssertions from "./email-registration-assertions"
import parseq from "../../dependencies/parseq";

// checks for email with GET
// then posts email
function testEmailRegistration(environmentVariables, expectedPayload) {
    return parseq.sequence([
        checkEmailAbsence(environmentVariables),
        registerEmail(environmentVariables, expectedPayload)
    ])
}

export default testEmailRegistration;
