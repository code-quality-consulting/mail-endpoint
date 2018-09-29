/*jslint
    node
*/

export default function assertionLogger(test, callback, tearDown) {

    const {assertions, successMessage} = test;
    const failingAssertions = Object.keys(assertions)
        .filter(function (assertion) {
            const {expect, toEqual} = assertions[assertion];
            return !(expect === toEqual);
        });
    if (tearDown) {
        return tearDown(callback);
    }
    if (failingAssertions.length === 0) {
        return callback(successMessage);
    }
    return callback(undefined, failingAssertions);
};

