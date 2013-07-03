var spawn = require('child_process').spawn;
var winston = require("winston");
var config = require('../config.js');


//private functions
//parsing request and converting it to input parameters for 
//raspistill
//raspistill Camera App v1.1
//
//Runs camera for specific time, and take JPG capture at end if requested
//
//usage: raspistill [options]

//Image parameter commands

//-w, --width  : Set image width <size>
//-h, --height  : Set image height <size>
//-q, --quality  : Set jpeg quality <0 to 100>
//-th, --thumb  : Set thumbnail parameters (x:y:quality)
//-e, --encoding  : Encoding to use for output file (jpg, bmp, gif, png)
//-x, --exif  : EXIF tag to apply to captures (format as 'key=value')

//Image parameter commands

//-sh, --sharpness  : Set image sharpness (-100 to 100)
//-co, --contrast  : Set image contrast (-100 to 100)
//-br, --brightness  : Set image brightness (0 to 100)
//-sa, --saturation  : Set image saturation (-100 to 100)
//-ISO, --ISO  : Set capture ISO
//-vs, --vstab  : Turn on video stablisation
//-ev, --ev  : Set EV compensation
//-ex, --exposure  : Set exposure mode (see Notes)
//-awb, --awb  : Set AWB mode (see Notes)
//-ifx, --imxfx  : Set image effect (see Notes)
//-cfx, --colfx  : Set colour effect (U:V)
//-mm, --metering  : Set metering mode (see Notes)
//-rot, --rotation  : Set image rotation (0-359)
//-hf, --hflip  : Set horizontal flip
//-vf, --vflip  : Set vertical flip
//
//
//Notes
//
//Exposure mode options :
//off,auto,night,nightpreview,backlight,spotlight,sports,snow,beach,verylong,fixedfps,antishake,fireworks
//
//AWB mode options :
//off,auto,sun,cloud,shade,tungsten,fluorescent,incandescent,flash,horizon

//Image Effect mode options :
//none,negative,solarise,sketch,denoise,emboss,oilpaint,hatch,gpen,pastel,watercolour,film,blur,saturation,colourswap,washedout,posterise,colourpoint,colourbalance,cartoon
//
//Metering Mode options :
//average,spot,backlit,matrix
//
function parse_request_body(body) {
  var params = config.defaultphotoparams.slice(0);
  var variable;

  for (variable in body) {
    if (variable !== '__proto__') {
      switch (variable) {
      case 'width':
        params.push('-w');
        params.push(body[variable]);
        break;
      case 'height':
        params.push('-h');
        params.push(body[variable]);
        break;
      case 'hflip':
        params.push('-hf');
        break;
      case 'vflip':
        params.push('-vf');
        break;
      case 'vstab':
        params.push('-vs');
        break;
      case 'sharpness':
        params.push('-sh');
        params.push(body[variable]);
        break;
      case 'contrast':
        params.push('-co');
        params.push(body[variable]);
        break;
      case 'brightness':
        params.push('-br');
        params.push(body[variable]);
        break;
      case 'ISO':
        params.push('-ISO');
        params.push(body[variable]);
        break;
      case 'saturation':
        params.push('-sa');
        params.push(body[variable]);
        break;
      case 'rotation':
        params.push('-rot');
        params.push(body[variable]);
        break;
      case 'ev':
        params.push('-ev');
        params.push(body[variable]);
        break;
      case 'awb_mode':
        params.push('-awb');
        params.push(body[variable]);
        break;
      case 'image_effect':
        params.push('-ifx');
        params.push(body[variable]);
        break;
      case 'exposure_mode':
        params.push('-ex');
        params.push(body[variable]);
        break;
      case 'meetering_mode':
        params.push('-mm');
        params.push(body[variable]);
        break;
      default:
        winston.info('filtering away ' + variable);
        break;
      }
    }
  }
  return params;
}

function raspistill(params, outputstream) {
  winston.profile('raspistill');
  var cmd = spawn(config.photocommand, params);
  cmd.stdout.pipe(outputstream);
  cmd.stderr.on('data', function (data) {
    winston.info('Error' + data.toString());
  });
  winston.profile('raspistill');
}


function handle_photo(req, res) {
  winston.profile('handle_photo');
  //Set the header 
  res.writeHead(200, {'Content-Type': 'image/jpg'});
  //Extract the parameters from the request
  var params = parse_request_body(req.body);
  //call raspistill
  raspistill(params, res);
  winston.profile('handle_photo');
}

exports.take_photo = handle_photo;
exports.test = function (req, res) {
  var params = parse_request_body(req.body);
  winston.info('width:' + req.body.width);
  winston.info('height:' + req.body.height);
  res.end(params.toString());
};