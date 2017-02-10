"use strict";

var expect = require('chai').expect;
var _ = require("lodash");
var sequenceMatcher = require("../lib/SequenceMatcher");
var MicroRNASequenceInfo = require("../lib/MicroRNASequenceInfo");

var getRoundedTotalPercentage = _.curryRight(sequenceMatcher.getRoundedTotalPercentage)(3);


describe('Find Sequences', function() {
    describe('100% Match', function() {
        const sourceSequenceInfo = new MicroRNASequenceInfo(null, "Test Source", "uagcagcacagaaauauu");
        const targetSequenceInfo = new MicroRNASequenceInfo(null, "Test Target", "uagcagcacagaaauauu");

        it(`should return a 100% match for the two sequences [src=${sourceSequenceInfo.sequence} target=${targetSequenceInfo.sequence}]`, function() {
            const matchResults = sequenceMatcher.findMatches(sourceSequenceInfo, targetSequenceInfo);
            matchResults.printResults();

            expect(getRoundedTotalPercentage(matchResults.subSequenceMatchResultsArray)).to.equal(1.0);
        });
    });
    describe('Uniform Consecutive Match til Last 3 Chars', function() {
        const sourceSequenceInfo = new MicroRNASequenceInfo(null, "Test Source", "uagcagcacagaaauauu");
        const targetSequenceInfo = new MicroRNASequenceInfo(null, "Test Target", "uagcagcacagaaaugca");

        it(`should return a 83.3% match for the two sequences [src=${sourceSequenceInfo.sequence} target=${targetSequenceInfo.sequence}]`, function() {
            const matchResults = sequenceMatcher.findMatches(sourceSequenceInfo, targetSequenceInfo);
            matchResults.printResults();

            expect(getRoundedTotalPercentage(matchResults.subSequenceMatchResultsArray)).to.equal(0.833);
        });
    });

    describe('Consecutive Match Shifted by 3 Chars', function() {
        const sourceSequenceInfo = new MicroRNASequenceInfo(null, "Test Source", "uagcagcacagaaauauuccg");
        const targetSequenceInfo = new MicroRNASequenceInfo(null, "Test Target", "gacuagcagcacagaaauauu");

        it(`should return a 85.7% match for the two sequences [src=${sourceSequenceInfo.sequence} target=${targetSequenceInfo.sequence}]`, function() {
            const matchResults = sequenceMatcher.findMatches(sourceSequenceInfo, targetSequenceInfo);
            matchResults.printResults();

            expect(getRoundedTotalPercentage(matchResults.subSequenceMatchResultsArray)).to.equal(0.857);
        });
    });

    describe('Two Non-Consecutive Matches at the same indices', function() {
        const sourceSequenceInfo = new MicroRNASequenceInfo(null, "Test Source", "uagcagcacagaaauauu");
        const targetSequenceInfo = new MicroRNASequenceInfo(null, "Test Target", "uagcagcaaggaaauauu");

        it(`should return a 88.9% match for the two sequences [src=${sourceSequenceInfo.sequence} target=${targetSequenceInfo.sequence}]`, function() {
            const matchResults = sequenceMatcher.findMatches(sourceSequenceInfo, targetSequenceInfo);
            matchResults.printResults();

            expect(getRoundedTotalPercentage(matchResults.subSequenceMatchResultsArray)).to.equal(0.889);
        });
    });

    describe('Two Non-Consecutive Matches at different indices', function() {
        const sourceSequenceInfo = new MicroRNASequenceInfo(null, "Test Source", "uagcagcacauugaaauauu");
        const targetSequenceInfo = new MicroRNASequenceInfo(null, "Test Target", "auagcagcaaggaaauauug");

        it(`should return a 95% match for the two sequences [src=${sourceSequenceInfo.sequence} target=${targetSequenceInfo.sequence}]`, function() {
            const matchResults = sequenceMatcher.findMatches(sourceSequenceInfo, targetSequenceInfo);
            matchResults.printResults();

            expect(getRoundedTotalPercentage(matchResults.subSequenceMatchResultsArray)).to.equal(0.95);
        });
    });

    describe('Multiple Matches for a Single Subsequence', function() {
        const sourceSequenceInfo = new MicroRNASequenceInfo(null, "Test Source", "uagcagcacauugaaauauu");
        const targetSequenceInfo = new MicroRNASequenceInfo(null, "Test Target", "aaasdfaaajkhsdaaa");

        it(`should return a 52.9% match for the two sequences [src=${sourceSequenceInfo.sequence} target=${targetSequenceInfo.sequence}]`, function() {
            const matchResults = sequenceMatcher.findMatches(sourceSequenceInfo, targetSequenceInfo);
            matchResults.printResults();

            expect(getRoundedTotalPercentage(matchResults.subSequenceMatchResultsArray)).to.equal(0.529);
        });
    });
});