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
        expectsEmailRegistered(function (value) {
            return {
                "It should generate an id": {
                    expect: value.id === 283325272034485980,
                    toEqual: true,
                    actualResult: value.id
                },
                "The id should be a number": {
                    expect: typeof(value.id) === "number",
                    toEqual: true,
                    actualResult: value.id
                },
                "It should post a name": {
                    expect: value.name === "Zach and Ben",
                    toEqual: true,
                    actualResult: value.name
                },
                "The name should be a string": {
                    expect: typeof(value.name) === "string",
                    toEqual: true,
                    actualResult: value.name
                },
                "It should post an email": {
                    expect: value.email === "demo@cqc.com",
                    toEqual: true,
                    actualResult: value.email
                },
                "The email should be a string": {
                    expect: typeof(value.email) === "string",
                    toEqual: true,
                    actualResult: value.email
                }
            };
        }, deleteEmail(
            environmentVariables,
            expectedPayload
        ))
    ])
}

export default testEmailRegistration;
