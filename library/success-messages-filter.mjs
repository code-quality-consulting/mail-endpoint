/*jslint
    node
*/

export default function successMessagesFilter () {
    return function (callback, value) {
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
}
