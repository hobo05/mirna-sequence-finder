
var sequenceMatcher = require("./lib/SequenceMatcher");
var excelLoader = require("./lib/ExcelLoader");

let excelFilename = "/Users/tcheng/Google\ Drive/Career/Royal\ commission/miRNa\ sequences.xlsx";
excelLoader(excelFilename).then(sequenceInfoArray => {
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
    }).then(sequenceMatchResultsArray => console.log(`sequenceMatchResultsArray=${JSON.stringify(sequenceMatchResultsArray, null, 4)}`));