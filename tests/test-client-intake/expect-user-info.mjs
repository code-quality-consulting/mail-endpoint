/*jslint
    node
*/
import assertionLogger from "../assertion-logger";

export default function expectUserInfo(callback, value) {
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

    const test = {
        assertions,
        successMessage: "All tests passing in file: client-post-request"
    };
    assertionLogger(test, callback);
};
