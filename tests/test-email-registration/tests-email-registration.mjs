/*jslint
    node
*/

import checkEmailAbsence from "../check-email-absence";
import registerEmail from "../../src/api-post-request";
import expectsEmailRegistered from "./expects-email-registered";
import deleteEmail from "../delete-email";
import parseq from "../../dependencies/parseq";

// checks for email with GET
// then posts email
function testEmailRegistration(environmentVariables, expectedPayload) {
    return parseq.sequence([
        checkEmailAbsence(environmentVariables),
        registerEmail(environmentVariables, expectedPayload),
        expectsEmailRegistered(deleteEmail(
            environmentVariables,
            expectedPayload
        ))
    ])
}

export default testEmailRegistration;
