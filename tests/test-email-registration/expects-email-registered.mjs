import assertionLogger from "../assertion-logger";
import deleteEmail from "../delete-email";

export default function expectEmailRegistered(composeAssertions, tearDown) {
    return function expectationRequestor (callback, value) {
        const assertions = composeAssertions(value);
        const test = {
            assertions,
            successMessage: "All tests pass in file: api-post-request"
        };

        assertionLogger(test, callback, tearDown);
    }
}
