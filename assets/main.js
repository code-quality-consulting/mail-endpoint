/*jslint
    browser
    devel
*/

// Carrd Core JS | carrd.co | License: MIT
const {addEventListener} = window;
var input = document.getElementsByClassName("form02-email");
console.log("Here is the input value: ", input.value);
var on = addEventListener;
var $ = function (q) {
    "use strict";
    return document.querySelector(q);
};
var $$ = function (q) {
    "use strict";
    return document.querySelectorAll(q);
};
var $body = document.body;
var $inner = $(".inner");
var client = (function () {
    "use strict";
    var o = {
        browser: "other",
        browserVersion: 0,
        os: "other",
        osVersion: 0,
        canUse: null
    };
    var ua = navigator.userAgent;
    var a;

    // browser, browserVersion.
    a = [
        ["firefox", /Firefox\/([0-9\\.]+)/],
        ["edge", /Edge\/([0-9\\.]+)/],
        ["safari", /Version\/([0-9\\.]+).+Safari/],
        ["chrome", /Chrome\/([0-9\\.]+)/],
        ["ie", /Trident\/.+rv:([0-9]+)/]
    ];
    a.forEach(function (array) {
        if (ua.match(array[1])) {
            const match = ua.match(array[1]);
            o.browser = array[0];
            o.browserVersion = parseFloat(match[1]);
        }
    });

    // os, osVersion.
    a = [
        [
            "ios", /([0-9_]+)\slike\sMac\sOS\sX/,
            function (v) {
                return v.replace("_", ".").replace("_", "");
            }
        ],
        ["ios", /CPU\slike\sMac\sOS\sX/, function () {
            return 0;
        }],
        ["android", /Android\s([0-9\\.]+)/, null],
        [
            "mac", /Macintosh.+Mac\sOS\sX\s([0-9_]+)/,
            function (v) {
                return v.replace("_", ".").replace("_", "");
            }
        ],
        ["windows", /Windows\sNT\s([0-9\\.]+)/, null]
    ];

    a.forEach(function (array) {
        if (ua.match(array[1])) {
            const match = ua.match(array[1]);
            o.os = array[0];
            o.osVersion = parseFloat(
                array[2]
                    ? (array[2])(match[1])
                    : match[1]
            );
        }
    });

      // canUse.
    var _canUse = document.createElement("div");
    o.canUse = function (p) {
        var e = _canUse.style;
        var up = p.charAt(0).toUpperCase() + p.slice(1);
        return (
            e.hasOwnProperty(p)
            || e.hasOwnProperty("Moz" + up)
            || e.hasOwnProperty("Webkit" + up)
            || e.hasOwnProperty("O" + up)
            || e.hasOwnProperty("ms" + up)
        );
    };

    return o;

}());
var trigger = function (t) {
    "use strict";
    const {dispatchEvent} = window;
    if (client.browser === "ie") {

        var e = document.createEvent("Event");
        e.initEvent(t, false, true);
        dispatchEvent(e);

    } else {
        dispatchEvent(new Event(t));
    }
};

// Animation.
on("load", function () {
    "use strict";
    setTimeout(function () {
        $body.className = $body.className.replace(
            /\bis-loading\b/,
            "is-playing"
        );

        setTimeout(function () {
            $body.className = $body.className.replace(
                /\bis-playing\b/,
                "is-ready"
            );
        }, 625);
    }, 100);
});

// Browser hacks.

// Init.
var style;
var sheet;
var rule;

// Create <style> element.
style = document.createElement("style");
style.appendChild(document.createTextNode(""));
document.head.appendChild(style);

// Get sheet.
sheet = style.sheet;
// Android.
if (client.os === "android") {

      // Prevent background "jump" when address bar shrinks.
      // Specifically, this fix forces the background pseudoelement to a fixed height based on the physical
      // screen size instead of relying on "vh" (which is subject to change when the scrollbar shrinks/grows).
    (function () {
        "use strict";
          // Insert and get rule.
        sheet.insertRule("body::after { }", 0);
        rule = sheet.cssRules[0];

          // Event.
        var f = function () {
            rule.style.cssText = "height: "
                    + (Math.max(screen.width, screen.height)) + "px";
        };

        on("load", f);
        on("orientationchange", f);
        on("touchmove", f);

    }());

} else if (client.os === "ios") { //iOS

      // Prevent white bar below background when address bar shrinks.
      // For some reason, simply forcing GPU acceleration on the background pseudoelement fixes this.
    (function () {
        "use strict";
        // Insert and get rule.
        sheet.insertRule("body::after { }", 0);
        rule = sheet.cssRules[0];

        // Set rule.
        rule.style.cssText = "-webkit-transform: scale(1.0)";

    }());

      // Prevent white bar below background when form inputs are focused.
      // Fixed-position elements seem to lose their fixed-ness when this happens, which is a problem
      // because our backgrounds fall into this category.
    (function () {
        "use strict";
        // Insert and get rule.
        sheet.insertRule("body.ios-focus-fix::before { }", 0);
        rule = sheet.cssRules[0];

        // Set rule.
        rule.style.cssText = "height: calc(100% + 60px)";

        // Add event listeners.
        on("focus", function () {
            $body.classList.add("ios-focus-fix");
        }, true);

        on("blur", function () {
            $body.classList.remove("ios-focus-fix");
        }, true);

    }());
} else if (client.browser === "ie") { // IE

      // Flexbox workaround.
      // IE"s flexbox implementation doesn"t work when 'min-height' is used, so we can work around this
      // by switching to 'height' but simulating the behavior of 'min-height' via JS.
    (function () {
        "use strict";
        const {getComputedStyle} = window;
        var d; // used to be t
        var f;

          // Handler function.
        f = function () {
            const {innerHeight} = window;
            var mh;
            var h;
            var s;
            var xx;
            var x;

            // Wrapper.
            x = $("#wrapper");

            x.style.height = "auto";

            if (x.scrollHeight <= innerHeight) {
                x.style.height = "100vh";
            }

            // Containers with full modifier.
            xx = $$(".container.full");

            xx.forEach(function (x) {
                s = getComputedStyle(x);

                // Get min-height.
                x.style.minHeight = "";
                x.style.height = "";

                mh = s.minHeight;

                // Get height.
                x.style.minHeight = 0;
                x.style.height = "";

                h = s.height;

                  // Zero min-height? Do nothing.
                    /*
                     if (mh === 0) {
                        continue;
                    }
                    */
                // Set height.
                x.style.height = (h > mh
                    ? "auto"
                    : mh);
            });
        };

        // Do an initial call of the handler.
        (f)();

        // Add event listeners.
        on("resize", function () {

            clearTimeout(d); // used to be t

            d = setTimeout(f, 250); // used to be t

        });

        on("load", f);

    }());

}
// Object-fit polyfill for Image elements.
if (!client.canUse("object-fit")) {

    var xx = $$(".image[data-position]");
    var c;
    var src;

    xx.forEach(function (x) {
        "use strict";

        // Element, img.
        c = x.firstChild;

        if (c.tagName !== "IMG") {
            c = c.firstChild;
        }

        // Get src.
        if (c.parentNode.classList.contains("deferred")) {

            c.parentNode.classList.remove("deferred");
            src = c.getAttribute("data-src");
            c.removeAttribute("data-src");

        } else {
            src = c.getAttribute("src");
        }
        // Set src as background.
        c.style.backgroundImage = "url(\"" + src + "\")";
        c.style.backgroundSize = "cover";
        c.style.backgroundPosition = x.dataset.position;
        c.style.backgroundRepeat = "no-repeat";

        // Clear src.
        c.src = "data:image/svg+xml;charset=utf8,"
                + `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1" viewBox="0 0 1 1"></svg>`;

    });
}
