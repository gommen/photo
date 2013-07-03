var spawn = require('child_process').spawn;
var winston = require("winston");
var config = require('../config.js');


//private functions
function parse_request_body(body) {
  var params = [];
  var variable;

  for (variable in body) {
    switch (variable) {
    case 'width':
      params.push('-w');
      params.push(body[variable]);
      break;
    case 'height':
      params.push('-h');
      params.push(body[variable]);
      break;
    default:
      winston.info('filtering away ' + variable);
      break;
    }
  }
  return params;
}

function raspistill(params, outputstream) {
  var cmd = spawn(config.photocommand, params);
  cmd.stdout.pipe(outputstream);
}


function handle_photo(req, res) {
  //Set the header 
  res.writeHead(200, {'Content-Type': 'image/jpg'});
  //Extract the parameters from the request
  var params = parse_request_body(req.body);
  //call raspistill
  raspistill(params, res);
}

exports.handle_photo = handle_photo;
exports.test = function (req, res) {
  var params = parse_request_body(req.body);
  winston.info('width:' + req.body.width);
  winston.info('height:' + req.body.height);
  res.end(params.toString());
};