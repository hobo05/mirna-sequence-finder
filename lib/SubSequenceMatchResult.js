var _ = require("lodash");

/**
 * Result of matching a particular substring from a source sequence to a target sequence
 */
class SubSequenceMatchResult {
    constructor(sourceSequenceInfo, targetSequenceInfo, subSequenceSubstringTuple, matchSubstringTupleArray) {
    	this.sourceSequenceInfo = sourceSequenceInfo;
    	this.targetSequenceInfo = targetSequenceInfo;
        this.subSequenceSubstringTuple = subSequenceSubstringTuple;
        this.matchSubstringTupleArray = matchSubstringTupleArray;
    }

    /**
     * @return {String} The substring of the source sequence used for matching
     */
    subSequence() {
    	return this.sourceSequenceInfo.sequence.substring(this.subSequenceSubstringTuple.start, this.subSequenceSubstringTuple.end);
    }

    /**
     * @return {Number} The percentage of total characters matched to the target sequence
     */
    percentage() {
        // Find all the characters matched in the targetSequence
        let totalCharsMatched = _.reduce(this.matchSubstringTupleArray, (charsMatched, substringTuple) => {
            return charsMatched + substringTuple.end - substringTuple.start;
        }, 0);

        // Return the percentage of characters matched
        return totalCharsMatched / this.targetSequenceInfo.sequence.length;
    }

    /**
     * Checks if a potential match is wholly contained within an existing match
     * 
     * @param  {SubstringTuple} potentialMatchSubstringTuple The SubstringTuple of a potential match wihtin the target sequence
     * @return {Boolean} Whether the potential match is within another matching substring
     */
    substringTupleWithinExistingMatch(potentialMatchSubstringTuple) {
    	for (let i = 0; i < this.matchSubstringTupleArray.length; i++) {
    		let matchedSubstringTuple = this.matchSubstringTupleArray[i];
    		if (matchedSubstringTuple.contains(potentialMatchSubstringTuple)) {
    			return true;
    		}
    	}
    	return false;
    }
}

module.exports = SubSequenceMatchResult;