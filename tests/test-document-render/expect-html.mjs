import assertionLogger from "../assertion-logger";

export default function expectHtml(
    composeAssertions,
    tearDown
) {
    return function expectationRequestor (callback, value) {
        const assertions = composeAssertions(value);  
        const test = {
            assertions,
            successMessage: "All tests pass in file: test-get-index"
        };

        assertionLogger(test, callback, tearDown);

    }
}
