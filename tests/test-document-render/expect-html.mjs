import assertionLogger from "../assertion-logger";

export default function expectHtml(
    composeAssertions,
    tearDown
) {
    return function expectationRequestor (callback, value) {
        const assertions = composeAssertions(value);
        let test;
        if (!value.successMessages) {
            test = {
                assertions,
                successMessages: ["All tests pass in file: test-get-index"]
            };
        }

        if (value.successMessages) {
            test = {
                assertions,
                successMessages: [...value.successMessages,
                    "All tests pass in file: test-get-index"
                ]
            };
        }
        assertionLogger(test, callback, tearDown);
    }
}
