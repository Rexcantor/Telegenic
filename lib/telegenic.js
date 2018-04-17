var ffmpeg = require('fluent-ffmpeg');
const uuidv4 = require('uuid/v4');
var path = require('path');
var os = require('os');

var tempFiles = [];

exports.makeSlideshow = function(options) {
  tempFiles = [];
  exportIndividualFrames(options);
}

function exportIndividualFrames(options) {
  exportIndividualFrame(options, options.input, 0, function() {
    renderOutput(options);
  });
}

function exportIndividualFrame(options, array, index, jobLast) {
  if (index == array.length) {
    jobLast();
    return;
  }

  //var animator = require('./lib/animations/' + animation + ".js");
  var filePath = path.join(os.tmpdir(), 'telegenic-' + uuidv4() + ".mp4");
  tempFiles.push(filePath);
  ffmpeg(options.input[index])
    .loop(options.globalImageDuration)
    .size(options.width + "x" + options.height)
    /*.videoFilters(
      [
        "scale=" + options.width + ":" + options.height + ":force_original_aspect_ratio=decrease",
        "pad=" + options.width + ":" + options.height + ":(ow-iw)/2:(oh-ih)/2"
      ]
    )*/
    .autopad()
    .videoFilter("setsar=sar=" + options.width / options.height)
    .on('error', function(err) {
      console.log('An error occurred: ' + err.message);
    })
    .on('end', function(err) {
      console.log('Finished rendering!');
      exportIndividualFrame(options, array, ++index, jobLast);
    })
    .on('start', function(cmd) {
      console.log(cmd);
    })
    .save(filePath);
}

function renderOutput(options) {
  var output = ffmpeg();
  console.log(tempFiles);
  for (var i = 0; i < tempFiles.length; i++) {
    output.input(tempFiles[i]);
  }
  output.mergeToFileSAR = function(target, options, sar) {
    // Find out which streams are present in the first non-stream input
    var fileInput = this._inputs.filter(function(input) {
      return !input.isStream;
    })[0];

    var self = this;
    this.ffprobe(this._inputs.indexOf(fileInput), function(err, data) {
      if (err) {
        return self.emit('error', err);
      }

      var hasAudioStreams = data.streams.some(function(stream) {
        return stream.codec_type === 'audio';
      });

      var hasVideoStreams = data.streams.some(function(stream) {
        return stream.codec_type === 'video';
      });

      // Setup concat filter and start processing
      self.output(target, options)
        .complexFilter([
      "setsar=sar=" + sar,
      {
          filter: 'concat',
          options: {
            n: self._inputs.length,
            v: hasVideoStreams ? 1 : 0,
            a: hasAudioStreams ? 1 : 0
          },
          outputs: ["v", "a"]
        }], ["v", "a"])
        .run();
    });

    return this;
  };
  output
    .on('start', function(cmd) {
      console.log("Starting rendering output...");
      console.log(cmd);
    })
    .on('error', function(err) {
      console.log('An error occurred: ' + err.message);
    })
    .on('end', function(err) {
      alert('Finished rendering output!');
    })
    .mergeToFileSAR(options.output, os.tmpdir(), options.width / options.height);
}
