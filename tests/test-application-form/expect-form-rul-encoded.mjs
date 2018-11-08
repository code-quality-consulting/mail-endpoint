import assertionLogger from "../assertion-logger";

export default function expectFormUrlEncoded(composeAssertions, tearDown) {
    return function expectationRequestor (callback, value) {
        const assertions = composeAssertions(value);
        let test;
        if (!value.successMessages) {
            test = {
                assertions,
                successMessages : [
                    "All tests pass in file: test-form-url-encoded"
                ]
            };
        }
        if (value.successMessages) {
            test = {
                assertions,
                successMessages: [
                    ...value.successMessages,
                    "All tests pass in file: test-form-url-encoded"
                ]
            };
        }
        assertionLogger(test, callback, tearDown);
    }
}
