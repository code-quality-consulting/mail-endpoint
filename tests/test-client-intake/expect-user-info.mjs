/*jslint
    node
*/
import assertionLogger from "../assertion-logger";

export default function expectUserInfo(composeAssertions) {
    return function (callback, value) {
        const {subscriber} = value;
        const assertions = composeAssertions(subscriber);
        let test;
        if (!value.successMessages) {
            test = {
                assertions,
                successMessages: [
                    "All tests pass in file: test-client-intake"
                ]
            };
        }
        if (value.successMessages) {
            test = {
                assertions,
                successMessages: [
                    ...value.successMessages,
                    "All tests pass in file: test-client-intake"
                ]
            };
        }
        assertionLogger(test, callback);
    };
};
