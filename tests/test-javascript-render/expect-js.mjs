import assertionLogger from "../assertion-logger";

export default function expectJs(
    composeAssertions,
    tearDown
) {
    return function expectationRequestor(callback, value) {
        const assertions = composeAssertions(value);
        let test;
        if (!value.successMessages) {
            test = {
                assertions,
                successMessages: ["All tests pass in file: test-get-js"]
            };
        }
        if (value.successMessages) {
            test = {
                assertions,
                successMessages: [...value.successMessages,
                    "All tests pass in file: test-get-js"
                ]
            };
        }
        assertionLogger(test, callback, tearDown);
    }
}
