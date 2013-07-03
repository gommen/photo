//Config file
var config = {};

config.photocommand = process.env.RASPISTILL || '/Users/michael/bin/raspistill';
config.defaultphotoparams = ['-t', '0', '-o', '-']; //do not wait

module.exports = config;