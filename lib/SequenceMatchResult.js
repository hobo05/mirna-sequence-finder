var _ = require("lodash");

class SequenceMatchResult {
    constructor(sourceSequenceInfo, targetSequenceInfo, subSequenceMatchResultsArray) {
    	this.sourceSequenceInfo = sourceSequenceInfo;
    	this.targetSequenceInfo = targetSequenceInfo;
    	this.subSequenceMatchResultsArray = subSequenceMatchResultsArray;
    }

	printResults() {
		console.log(_.repeat("=", 50));
		console.log(_.pad(` Matching Results for ${this.sourceSequenceInfo.sequence} `, 50, "="));
		console.log(_.pad(` Against ${this.targetSequenceInfo.sequence} `, 50, "="));
		console.log(_.repeat("=", 50));

		_.each(this.subSequenceMatchResultsArray, matchResults => {
			let label = " Sub Sequence = ";
			console.log(`${label}${this.sourceSequenceInfo.sequence} `);
			let indicators = _.repeat(" ",label.length + matchResults.subSequenceSubstringTuple.start) 
			+ _.repeat("^", matchResults.subSequenceSubstringTuple.end - matchResults.subSequenceSubstringTuple.start);
			console.log(`${indicators}`);

			_.each(matchResults.matchSubstringTupleArray, (substringTuple, index) => {

				let label = `    Match ${index}: `;
				console.log(`${label}${matchResults.targetSequenceInfo.sequence}`)
				let indicators = _.repeat(" ",label.length + substringTuple.start) + _.repeat("^", substringTuple.end - substringTuple.start);
				console.log(`${indicators}`);

			});

			console.log(_.pad(` End for subSequence = ${matchResults.subSequence()} `, 50, "="));
			console.log()
		});
	}
}

module.exports = SequenceMatchResult;