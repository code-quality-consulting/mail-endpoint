/*jslint
    node
*/
import parseq from "../../dependencies/parseq";
//import {makeServer} from "../../server";
import registerEmail from "../../src/api-post-request";
import successMessagesFilter from 
    "../../library/success-messages-filter.mjs";
import expectFormUrlEncoded from "./expect-form-url-encoded";

function testApplicationForm(environmentVariables, expectedPayload) {
    return parseq.sequence([
        registerEmail(environmentVariables, expectedPayload),
        successMessagesFilter(),
        expectFormUrlEncoded(function (value) {
            const objectConstructor = {}.constructor;
            return {
                "It should be type JSON": {
                    expect: 
                        value.jsonObject.constructor === objectConstructor
                        &&
                        value.constructor !== null,
                    toEqual: true,
                    actualResult: value.jsonObject
                },
                "It should be content-type application/x-www-form-urlencoded": 
                    {
                        expect: value.contentType 
                            === 
                            "application/x-www-form-urlencoded",
                        toEqual: true,
                        actualResult: value.contentType
                    }
            };
        })
    ])
}
