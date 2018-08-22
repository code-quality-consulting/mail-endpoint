/*jslint
    node
*/

export default function assertionLogger(assertions, reason, value) {
    if (reason) {
        console.error(reason);
    }
    if (value) {
        const failingAssertions = Object.keys(assertions)
            .filter(function (assertion) {
                const {expect, toEqual} = assertions[assertion];
                return !(expect === toEqual);
            });
        failingAssertions.forEach(function (assertion) {
            console.error(
                assertion
            );
        });

        if (failingAssertions.length === 0) {
            console.log("All post tests are passing.");
            // All post tests are passing in file: ${currentFileName}
        }
    }
};

