import _ from 'lodash';

// Load jquery and bootstrap
var $ = require('jquery');
global.jQuery = require('jquery');
require('bootstrap');

// Require CSS
require("./app.css");

var myArray = [1,2,3];
_.each(myArray, item => console.log(item));
console.log("blah");