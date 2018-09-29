/*jslint
    node
*/
import assertionLogger from "../assertion-logger";

export default function expectUserInfo(composeAssertions) {
    return function (callback, value) {
        const assertions = composeAssertions(value);
        const test = {
            assertions,
            successMessage: "All tests passing in file: client-post-request"
        };
        assertionLogger(test, callback);
    };
};
