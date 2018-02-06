// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// Test options. In the future, this should be provided by the application itself.
// All options should be provided. If anything is ommited, the application with throw an error.
// In the future, a list of default options will be added and you'll only need to provide the options you want to change.
var options = {
  // The animation to apply in case the input didn't specify.
  globalAnimation: "crossfade",
  // The witdth of the output video.
  width: 853,
  // The height of the output video.
  height: 480,
  // The input files.
  input: [
    "test_imgs/1.png",
    "test_imgs/2.png",
    "test_imgs/3.png",
    "test_imgs/4.png",
    "test_imgs/5.png",
  ],
  // The length to apply to each image, in seconds, in case the input didn't specify.
  globalImageDuration: 5
};

var telegenic = require("./lib/telegenic.js");
document.getElementById("start").onclick = function() { telegenic.makeSlideshow(options); };
