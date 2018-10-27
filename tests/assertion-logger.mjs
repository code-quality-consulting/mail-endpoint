/*jslint
    node
*/

export default function assertionLogger(test, callback, tearDown) {
    const {assertions, successMessages} = test;
    const failingAssertions = Object.keys(assertions)
        .filter(function (assertion) {
            const {expect, toEqual} = assertions[assertion];
            return !(expect === toEqual);
        });
    if (tearDown) {
        if (failingAssertions.length === 0) {
            tearDown(callback, successMessages);
        }
        tearDown(callback, failingAssertions);
    }
    if (failingAssertions.length === 0) {
        callback({successMessages});
    }
    if (failingAssertions.length !== 0) {
        callback(undefined, failingAssertions);
    }
};
