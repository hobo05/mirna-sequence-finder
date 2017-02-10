"use strict";

// load env vars
require('dotenv').load();

var express = require('express');

var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");

var app = express();

var path = require("path");
var ejs = require('ejs');

var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: "/" // Same as `output.publicPath` in most cases.
}));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(__dirname + '/dist'))


var sequenceMatcher = require("./lib/SequenceMatcher");
var excelLoader = require("./lib/ExcelLoader");

let excelFilename = "/Users/tcheng/Google\ Drive/Career/Royal\ commission/miRNa\ sequences.xlsx";
var sequenceMatchResultsArrayPromise = excelLoader(excelFilename).then(sequenceInfoArray => {
    	// console.log(`sequenceInfoArray=${JSON.stringify(sequenceInfoArray, null, 4)}`)

    	// Only iterate til the second to last item since the last item 
    	// will have nothing left to compare with
    	let sequenceMatchResultsArray = [];
    	for (let i = 0; i < sequenceInfoArray.length - 1; i++) {
    		let sourceSequenceInfo = sequenceInfoArray[i];
    		for (let j = i+1; j < sequenceInfoArray.length; j++) {
    			let targetSequenceInfo = sequenceInfoArray[j];
    			const matchResults = sequenceMatcher.findMatches(sourceSequenceInfo, targetSequenceInfo);
    			matchResults.printResults();
    			sequenceMatchResultsArray.push(matchResults);
    		}
    	}

    	return sequenceMatchResultsArray;
    });

app.get('/', function(req, res) {
	sequenceMatchResultsArrayPromise.then(sequenceMatchResultsArray => res.render('index', {
		title: "Sequence Finder",
		sequenceMatchResultsArray: sequenceMatchResultsArray
	}));
})

app.listen(process.env.PORT, function () {
  console.log("Listening on port 3000!");
});