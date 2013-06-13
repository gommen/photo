var spawn = require('child_process').spawn;

var rapsitill_cmd = 'ls';
var raspistill_param = ['-lart'];
function raspistill(params, callback) {
  var cmd = spawn(rapsitill_cmd, raspistill_param);
  cmd.stdout.on('data', callback);
}


raspistill({}, function (data) {
  console.log('data', data.toString());
});
