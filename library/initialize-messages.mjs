/*jslint
    node
*/

export default function initializeMessages (callback, value) {
    if (callback) {
        if (value) {
            if (!value.successMessages) {
                return callback(
                    Object.assign(
                        {
                            successMessages: []
                        },
                        value
                    )
                );
            }
            if (value.successMessages) {
                return callback(
                    Object.assign(
                        {
                            successMessages: value.successMessages
                        },
                        value
                    )
                );
            }
        }
        if (!value) {
            value = {successMessages: []};
            return callback(value);
        }
    }
    if (!callback) {
        console.error("A handleMessages function requires a callback.");
    }
}
