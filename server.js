var express = require('express');
var app = express();
var request = require("request");

app.get('*', function(req, res) {
    var fetchURL = "http://your-origin-server-goes-here";
    var nonoriginURL = "https://the-endpoint-that-the-user-sees";
    if (req.originalUrl != undefined) {
        var rewriteURL = fetchURL + req.originalUrl;
    } else {
        var rewriteURL = fetchURL;
    }
    console.log(rewriteURL);
    if (rewriteURL.indexOf("jpg") == -1 && rewriteURL.indexOf("png") == -1 || rewriteURL.indexOf("woff") != -1) {
        request({
            "method": "GET",
            "uri": rewriteURL
        }).pipe(res);
    } else {
        console.log("Redirect (" + req.originalUrl + ")");
        res.redirect(nonoriginURL + req.originalUrl);
    }
});

app.listen(3000);
