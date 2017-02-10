var _ = require("lodash");
var SubstringTuple = require("../lib/SubstringTuple");
var SubSequenceMatchResult = require("../lib/SubSequenceMatchResult");
var SequenceMatchResult = require("../lib/SequenceMatchResult");

/**
 * Find all matching sequences within the source sequence within the target sequence
 * 
 * @param  {String}	sourceSequence The source sequence
 * @param  {String}	targetSequence The target sequence
 * @return {SequenceMatchResult} A SequenceMatchResult that represent all the matches for a source sequence and its target sequence
 */
function findMatches(sourceSequence, targetSequence) {
    let SubSequenceMatchResultsArray = [];

    let sourceStartPointer = 0
    while (sourceStartPointer < sourceSequence.length) {
        let charsInSequence = sourceSequence.length - sourceStartPointer;
        let hasMinRequiredChars = charsInSequence >= 3;
        let pointerIncrement = 1;

        if (hasMinRequiredChars) {
            for (let sourceEndPointer = sourceSequence.length; sourceEndPointer >= sourceStartPointer + 3; sourceEndPointer--) {
                let subSequence = sourceSequence.substring(sourceStartPointer, sourceEndPointer);
                let matchSubstringTupleArray = [];
                // console.log(`subSequence=${subSequence}`);

                let subSequenceRegex = new RegExp(subSequence, "g");
                let foundMatch = false;
                let matchResult;
                while ((matchResult = subSequenceRegex.exec(targetSequence)) !== null) {
                    // console.log(`Found ${matchResult[0]} Next match starts at ${subSequenceRegex.lastIndex}`);
					let startIndex = matchResult.index;
					let endIndex = subSequenceRegex.lastIndex;
					let matchSubstringTuple = new SubstringTuple(startIndex, endIndex);

					// Prevent matching a sequence within the bounds of an existing match
					if (substringTupleWithinExistingMatch(matchSubstringTuple, SubSequenceMatchResultsArray)) {
						continue;
					}

                    
                    let foundString = targetSequence.substring(startIndex, endIndex);
                    // console.log(`String found at startIndex=${startIndex}, endIndex=${endIndex}, foundString=${foundString}`);

                    // Add SubstringTuple to array
                    matchSubstringTupleArray.push(new SubstringTuple(startIndex, endIndex));

                    // Set foundMatch flag
                    foundMatch = true;
                }

                // Break out of for loop since we found a match
                if (foundMatch) {

                    // Create a new SubSequenceMatchResult
                    let subSequenceSubstringTuple = new SubstringTuple(sourceStartPointer, sourceEndPointer);
                    SubSequenceMatchResultsArray.push(new SubSequenceMatchResult(
                    	sourceSequence, 
                    	targetSequence,
                    	subSequenceSubstringTuple,
                    	matchSubstringTupleArray));

                    // Set the pointer to increment to where the end pointer stops
                    pointerIncrement = sourceEndPointer - sourceStartPointer;
                    break;
                }
            }
        }

        sourceStartPointer += pointerIncrement;
        // console.log(`Next sourceStartPointer=${sourceStartPointer}`);
    }

    return new SequenceMatchResult(sourceSequence, SubSequenceMatchResultsArray);
}

/**
 * Retrieves the total percentage of matches rounded to the precision given
 * 
 * @param  {Array} An Array of SubSequenceMatchResults
 * @param  {Number} The precision to round to
 * @return {Number} The rounded total percentage
 */
function getRoundedTotalPercentage(SubSequenceMatchResultsArray, precision) {
    let percentage = _.reduce(SubSequenceMatchResultsArray, (percentage, matchResults) => {
        return percentage + matchResults.percentage();
    }, 0);
    return _.round(percentage, precision);
}

/**
 * @param  {SubstringTuple} potentialMatchSubstringTuple The indices for
 * @param  {Array}
 * @return {Boolean}
 */
function substringTupleWithinExistingMatch(potentialMatchSubstringTuple, SubSequenceMatchResultsArray) {
	let resultsThatMatches =  _.find(SubSequenceMatchResultsArray, 
		matchResults => matchResults.substringTupleWithinExistingMatch(potentialMatchSubstringTuple));

	if (resultsThatMatches) {
		return true;
	}
	return false;
}

module.exports = {
    findMatches: findMatches,
    getRoundedTotalPercentage: getRoundedTotalPercentage
}