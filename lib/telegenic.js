var ffmpeg = require('fluent-ffmpeg');
const uuidv4 = require('uuid/v4');
var path = require('path');
var os = require('os');

/*var animation = "crossfade";

// TODO Calculate the other dimension

var width = 853;
var height = 480;
var resolution = (width < 0 ? "?" : width) + "x" + (height < 0 ? "?" : height);
var aspectRatio = "16:9";

var images = [
  "imgs/step_1.png",
  "imgs/step_2.png",
  "imgs/step_3.png",
  "imgs/step_4.png",
  "imgs/step_5.png"
];

var imageDuration = 5;*/

exports.makeSlideshow = function(options) {
  var tempFiles = [];
  //var animator = require('./lib/animations/' + animation + ".js");
  for (var i = 0; i < options.input.length; i++) {
    var filePath = path.join(os.tmpdir(), 'telegenic-' + uuidv4() + ".mp4");
    tempFiles.push(filePath);
    ffmpeg(options.input[i])
      .loop(options.globalImageDuration)
      .size(options.width + "x" + options.height)
      .videoFilters(
        [
          "scale=" + options.width + ":" + options.height + ":force_original_aspect_ratio=decrease",
          "pad=" + options.width + ":" + options.height + ":(ow-iw)/2:(oh-ih)/2"
        ]
      )
      .on('error', function(err) {
        console.log('An error occurred: ' + err.message);
      })
      .save(filePath);
  }
  alert("Saved files!");
}
