/**
 * Represents the String.substring start and end indices
 */
class SubstringTuple {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    /**
     * Checks if a given SubstringTuple has indices that are completely contained within
     * this SubstringTuple
     * 
     * @param  {SubstringTuple} substringTuple to check
     * @return {Boolean} contained within the substring or not
     */
    contains(substringTuple) {
    	let result = substringTuple.start >= this.start && substringTuple.end <= this.end;
    	// console.log(`[source=${JSON.stringify(this)}] contains [target=${JSON.stringify(substringTuple)}] = ${result}`);
    	return result;
    }
}

module.exports = SubstringTuple;