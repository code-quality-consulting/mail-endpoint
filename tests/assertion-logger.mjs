/*jslint
    node
*/

export default function assertionLogger(test, callback) {

    const {assertions, successMessage} = test;
    const failingAssertions = Object.keys(assertions)
        .filter(function (assertion) {
            const {expect, toEqual} = assertions[assertion];
            return !(expect === toEqual);
        });
    if (failingAssertions.length === 0) {
        return callback(successMessage);
    }
    return callback(undefined, failingAssertions);
};

