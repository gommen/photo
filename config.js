//Config file
var config = {};

config.photocommand = process.env.RASPISTILL || '/usr/bin/raspistill';
config.defaultphotoparams = ['-t', '0', '-o', '-']; //do not wait

module.exports = config;