import assertionLogger from "../assertion-logger";

export default function expectCss(
    composeAssertions,
    tearDown
) {
    return function expectationRequestor(callback, value) {
        const assertions = composeAssertions(value);
        let test;
        if (!value.successMessages) {
            test = {
                assertions,
                successMessages: ["All tests pass in file: test-get-css"]
            };
        }
        if (value.successMessages) {
            test = {
                assertions,
                successMessages: [...value.successMessages,
                    "All test pass in file: test-get-css"
                ]
            };
        }
        assertionLogger(test, callback, tearDown);
    }
}
