var ffmpeg = require('fluent-ffmpeg');
const uuidv4 = require('uuid/v4');
var path = require('path');
var os = require('os');

var animation = "crossfade";

var resolution = "?x480";
var aspectRatio = "16:9";

var images = [
  "imgs/step_1.png",
  "imgs/step_2.png",
  "imgs/step_3.png",
  "imgs/step_4.png",
  "imgs/step_5.png"
];

var imageDuration = 5;

exports.makeSlideshow = function() {
  var tempFiles = [];
  //var animator = require('./lib/animations/' + animation + ".js");
  for (var i = 0; i < images.length; i++) {
    var filePath = path.join(os.tmpdir(), 'telegenic-' + uuidv4() + ".mp4");
    tempFiles.push(filePath);
    ffmpeg(images[i]).loop(5).size(resolution).aspect(aspectRatio).on('error', function(err) {
      console.log('An error occurred: ' + err.message);
    }).save(filePath);
  }
  alert("Saved files!");
}
