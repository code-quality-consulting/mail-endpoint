import {makeServer} from "../../server";
import parseq from "../../dependencies/parseq";
import getJsFromServer from "./get-js-from-server";
import successMessagesFilter from "../../library/success-messages-filter";
import expectJs from "./expect-js";

export default function testGetJs(environmentVariables) {
    return parseq.sequence(
        [
            makeServer(environmentVariables),
            getJsFromServer(environmentVariables),
            successMessagesFilter(),
            expectJs(function (response) {
                return {
                    "The content-type should be application/javascript": {
                        expect: response.contentType
                            === "application/javascript",
                        toEqual: true,
                        actualResult: response.contentType
                    },
                    "The status code should be 200": {
                        expect: response.statusCode === 200,
                        toEqual: true,
                        actualResult: response.statusCode
                    },
                    "The response sends a JavaScript file": {
                        expect: response.data === "/*jslint",
                        toEqual: true,
                        actualResult: response.data
                    }
                }
            })
        ]
    )
}
