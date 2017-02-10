"use strict";

var expect = require('chai').expect;
var _ = require("lodash");
var sequenceMatcher = require("../lib/SequenceMatcher");

var getRoundedTotalPercentage = _.curryRight(sequenceMatcher.getRoundedTotalPercentage)(3);


describe('Find Sequences', function() {
    describe('100% Match', function() {
        const sourceSequence = "uagcagcacagaaauauu";
        const targetSequence = "uagcagcacagaaauauu";

        it(`should return a 100% match for the two sequences [src=${sourceSequence}, target=${targetSequence}]`, function() {
            const matchResults = sequenceMatcher.findMatches(sourceSequence, targetSequence);
            matchResults.printResults();

            expect(getRoundedTotalPercentage(matchResults.subSequenceMatchResultsArray)).to.equal(1.0);
        });
    });
    describe('Uniform Consecutive Match til Last 3 Chars', function() {
        const sourceSequence = "uagcagcacagaaauauu";
        const targetSequence = "uagcagcacagaaaugca";

        it(`should return a 83.3% match for the two sequences [src=${sourceSequence}, target=${targetSequence}]`, function() {
            const matchResults = sequenceMatcher.findMatches(sourceSequence, targetSequence);
            matchResults.printResults();

            expect(getRoundedTotalPercentage(matchResults.subSequenceMatchResultsArray)).to.equal(0.833);
        });
    });

    describe('Consecutive Match Shifted by 3 Chars', function() {
        const sourceSequence = "uagcagcacagaaauauuccg";
        const targetSequence = "gacuagcagcacagaaauauu";

        it(`should return a 85.7% match for the two sequences [src=${sourceSequence}, target=${targetSequence}]`, function() {
            const matchResults = sequenceMatcher.findMatches(sourceSequence, targetSequence);
            matchResults.printResults();

            expect(getRoundedTotalPercentage(matchResults.subSequenceMatchResultsArray)).to.equal(0.857);
        });
    });

    describe('Two Non-Consecutive Matches at the same indices', function() {
        const sourceSequence = "uagcagcacagaaauauu";
        const targetSequence = "uagcagcaaggaaauauu";

        it(`should return a 88.9% match for the two sequences [src=${sourceSequence}, target=${targetSequence}]`, function() {
            const matchResults = sequenceMatcher.findMatches(sourceSequence, targetSequence);
            matchResults.printResults();

            expect(getRoundedTotalPercentage(matchResults.subSequenceMatchResultsArray)).to.equal(0.889);
        });
    });

    describe('Two Non-Consecutive Matches at different indices', function() {
        const sourceSequence = "uagcagcacauugaaauauu";
        const targetSequence = "auagcagcaaggaaauauug";

        it(`should return a 95% match for the two sequences [src=${sourceSequence}, target=${targetSequence}]`, function() {
            const matchResults = sequenceMatcher.findMatches(sourceSequence, targetSequence);
            matchResults.printResults();

            expect(getRoundedTotalPercentage(matchResults.subSequenceMatchResultsArray)).to.equal(0.95);
        });
    });

    describe('Multiple Matches for a Single Subsequence', function() {
        const sourceSequence = "uagcagcacauugaaauauu";
        const targetSequence = "aaasdfaaajkhsdaaa";

        it(`should return a 52.9% match for the two sequences [src=${sourceSequence}, target=${targetSequence}]`, function() {
            const matchResults = sequenceMatcher.findMatches(sourceSequence, targetSequence);
            matchResults.printResults();

            expect(getRoundedTotalPercentage(matchResults.subSequenceMatchResultsArray)).to.equal(0.529);
        });
    });
});