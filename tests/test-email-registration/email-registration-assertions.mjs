import assertionLogger from "../assertion-logger";
import deleteEmail from "../api-delete-request";
const {ML_HOST, ML_PORT, ML_API_KEY} = process.env;

export default function emailRegistrationAssertions(value, reason) {
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
        } // the email string should include one @ and one .
    };

    const options = {
        assertions,
        reason,
        value,
        name: "All tests pass in file: api-post-request"
    };

    assertionLogger(options);

    // then deletes email
    deleteEmail(
        {
            ML_PORT,
            ML_HOST,
            ML_API_KEY
        },
        {
            email: "demo@cqc.com"
        }
    )(
        function (value, reason) {
            if (reason) {
                console.error(reason);
            }
            if (value) {
                console.log(value);
            }
        }
    );
}
