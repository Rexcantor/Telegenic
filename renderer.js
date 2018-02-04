// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var telegenic = require("./lib/telegenic.js");
document.getElementById("start").onclick = function() { telegenic.makeSlideshow(); };
