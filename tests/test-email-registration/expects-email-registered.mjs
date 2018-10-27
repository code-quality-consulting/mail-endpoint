import assertionLogger from "../assertion-logger";
import deleteEmail from "../delete-email";

export default function expectEmailRegistered(composeAssertions, tearDown) {
    return function expectationRequestor (callback, value) {
        const {subscriber} = value;
        const assertions = composeAssertions(subscriber);
        let test;
        if (!value.successMessages) {
            test = {
                assertions,
                successMessages: [
                    "All tests pass for test-email-registration"                            ]
            };
        }
        if (value.successMessages) {
            test = {
                assertions,
                successMessages: [...value.successMessages,
            "All tests pass in file: test-email-registration"
                ]
            };
        }
        assertionLogger(test, callback, tearDown); 
    }
}
