import {makeServer} from "../../server";
import parseq from "../../dependencies/parseq";
import getCssFromServer from "./get-css-from-server";
import successMessagesFilter from "../../library/success-messages-filter";
import expectCss from "./expect-css";

export default function testGetCss(environmentVariables) {
    return parseq.sequence(
        [
            makeServer(environmentVariables),
            getCssFromServer(environmentVariables),
            successMessagesFilter(),
            expectCss(function (response) {
                return {
                    "The content-type should be text/css": {
                        expect: response.contentType
                            === "text/css",
                        toEqual: true,
                        actualResult: response.contentType
                    },
                    "The status code should be 200": {
                        expect: response.statusCode === 200,
                        toEqual: true,
                        actualResult: response.statusCode
                    },
                    "The response sends a CSS file": {
                        expect: response.data === "html,body,div,span",
                        toEqual: true,
                        actualResult: response.data
                    }
                }
            })
        ]
    )
}
