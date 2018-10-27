import assertionLogger from "../assertion-logger";
const {ML_HOST, ML_PORT, ML_API_KEY} = process.env;

export default function expectEmailRegisteredByServer(
    composeAssertions,
    tearDown
) {
    return function expectationRequestor (callback, value) {
        const {subscriber} = value;
        const assertions = composeAssertions(subscriber);
        let test;
        if (!value.successMessages) {
            test = {
                assertions,
                successMessages: [
                    "All tests pass in file: test-email-registration-server"
                ]
            };
        }
        if (value.successMessages) {
            test = {
                assertions,
                successMessages: [
                    ...value.successMessages,
                    "All tests pass in file: test-email-registration-server"
                ]
            };
        }
        assertionLogger(test, callback, tearDown);
    }
}
