﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            args.setPromise(WinJS.UI.processAll());
        }
    };

    var _x, _y, _z, _wasShaken;

    function onReadingChanged(e) {
        _x.innerText = e.reading.accelerationX.toFixed(2);
        _y.innerText = e.reading.accelerationY.toFixed(2);
        _z.innerText = e.reading.accelerationZ.toFixed(2);
    }

    function onShaken(e) {
        _wasShaken.innerText = e.timestamp;
    }

    function getDomElements() {
        _x = document.querySelector("#x");
        _y = document.querySelector("#y");
        _z = document.querySelector("#z");
        _wasShaken = document.querySelector("#shaken");
    }

    function startAccelerometer() {
        var acc = Windows.Devices.Sensors.Accelerometer.getDefault()

        if (acc) {
            var minimumReportInterval = acc.minimumReportInterval;
            var reportInterval = minimumReportInterval > 16 ? minimumReportInterval : 25;
            acc.reportInterval = reportInterval;

            acc.addEventListener("readingchanged", onReadingChanged);
            acc.addEventListener("shaken", onShaken)
        }
    }

    app.onloaded = function () {
        getDomElements();
        startAccelerometer();
    }

    app.start();
})();
