var ffmpeg = require('fluent-ffmpeg');
var uuidv4 = require('uuid/v4');

exports.animateStart = function(input, length, resolution) {
  var filePath = path.join(os.tmpdir(), 'telegenic-' + uuidv4());
  ffmpeg(input).duration(length).size(resolution).on('error', function(err) {
    console.log('An error occurred: ' + err.message);
  }).save(filePath);
  return filePath;
}

exports.animateMiddle = function(input1, input2, length, resolution) {

}

exports.animateEnd = function(input, length, resolution) {
  
}
