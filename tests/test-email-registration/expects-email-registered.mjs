import assertionLogger from "../assertion-logger";
import deleteEmail from "../delete-email";

export default function expectEmailRegistered(tearDown) {
    return function expectationRequestor (callback, value) {
        const assertions = {
            "It should generate an id": {
                expect: value.id === 283325272034485980,
                toEqual: true,
                actualResult: value.id
            },
            "The id should be a number": {
                expect: typeof(value.id) === "number",
                toEqual: true,
                actualResult: value.id
            },
            "It should post a name": {
                expect: value.name === "Zach and Ben",
                toEqual: true,
                actualResult: value.name
            },
            "The name should be a string": {
                expect: typeof(value.name) === "string",
                toEqual: true,
                actualResult: value.name
            },
            "It should post an email": {
                expect: value.email === "demo@cqc.com",
                toEqual: true,
                actualResult: value.email
            },
            "The email should be a string": {
                expect: typeof(value.email) === "string",
                toEqual: true,
                actualResult: value.email
            }
        }; 
        const test = {
            assertions,
            successMessage: "All tests pass in file: api-post-request"
        };

        assertionLogger(test, callback, tearDown);
    }
}
