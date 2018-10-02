import assertionLogger from "../assertion-logger";
const {ML_HOST, ML_PORT, ML_API_KEY} = process.env;

export default function expectEmailRegisteredByServer(
    composeAssertions,
    tearDown
) {
    return function expectationRequestor (callback, value) {
        const assertions = composeAssertions(value);  
        const test = {
            assertions,
            successMessage: "All tests pass in file: api-post-request"
        };

        assertionLogger(test, callback, tearDown);

    }
}
