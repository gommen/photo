var spawn = require('child_process').spawn;
var winston = require("winston");

var rapsitill_cmd = '/Users/michael/bin/raspistill';
var raspistill_param = [];
function raspistill(params, data_callback, end_callback) {
  var cmd = spawn(rapsitill_cmd, raspistill_param);
  cmd.stdout.on('data', data_callback);
  cmd.stdout.on('end', end_callback);
  cmd.on('end', end_callback);
}


function handle_photo(req, res) {
  //Extract the parameters from the request
  //Set the header 
  res.writeHead(200, {'Content-Type': 'image/jpg'});
  //call raspistill
  raspistill({}, function (data) {
    res.write(data);
    winston.info('got a chunk of data');

  },
    function (data) {
      res.end();
      winston.info('data stream closed');
    }
    );
}

exports.handle_photo = handle_photo;