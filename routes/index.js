
/*
 * GET home page.
 */

exports.index = function (req, res) {
  var awb_modes_val = ['off', 'auto', 'sun', 'cloud', 'shade', 'tungsten', 'fluorescent', 'incandescent', 'flash', 'horizon'];
  var image_effects_val = ['none', 'negative', 'solarise', 'sketch', 'denoise', 'emboss', 'oilpaint', 'hatch', 'gpen', 'pastel', 'watercolour', 'film', 'blur', 'saturation', 'colourswap', 'washedout', 'posterise', 'colourpoint', 'colourbalance', 'cartoon'];
  var exposure_modes_val = ['off', 'auto', 'night', 'nightpreview', 'backlight', 'spotlight', 'sports', 'snow', 'beach', 'verylong', 'fixedfps', 'antishake', 'fireworks'];
  var meetering_modes_val = ['average', 'spot', 'backlit', 'matrix'];

  res.render('index', { title: 'Raspberry Pi Camera Board',
                        awb_modes: awb_modes_val,
                        image_effects: image_effects_val,
                        exposure_modes: exposure_modes_val,
                        meetering_modes: meetering_modes_val });
  


};