/*jslint
    devel, browser
*/
// should move parseq into a directory shared by frontend and backend
import parseq from "";

function testRequest(value, reason) {
    if (reason) {
        console.error(reason);
    }

    // we hit the CQC server from here which in turn will hit the ML server
    // I believe it just needs to hit the cqc url on port 443 which will 
    // then fire its request to ML
    const cqcUrl = "https://codequalityconsulting.com";

    // perhaps test that the input is an email (a string with an @ and a .)
    const assertions = {
        "Bad responseURL.": value.responseURL === cqcUrl,
        "Failed to receive correct response state.": value.status === 200
    };

    const failingAssertions = 
        Object.keys(assertions).filter(
            (assertion) => !assertions[assertion]
    );

    if (failingAssertions.length === 0) {
        console.log("All frontend tests are passing.");
    }

    if (failingAssertions.length !== 0) {
        console.error(failingAssertions);
    }
}

// I noticed that we aren't asking for a name on the frontend, just an email
// our test on the backend is more complex than needed. Cool that we get
// to simplify
function inviteRequestor(callback) {
    const invitationRequest = new XMLHttpRequest();
    invitationRequest.addEventListener(
        "load",
        function successHandler(event) {
            const {email} = JSON.parse(event.target);
            callback({
                email,
                responseURL: event.target.responseURL,
                status: event.target.status
            });
    });
    invitationRequest.open(
        "POST",
        "https://codequalityconsulting.com"
    );
    invitationRequest.send();
}

parseq.sequence([inviteRequestor], 3000)(testRequest);
