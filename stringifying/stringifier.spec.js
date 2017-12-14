var stringify = require("./stringifier");
var expect = require("chai").expect;

describe("stringifier", function () {
    it("returns right string for atomic term", function () {
        var atomicTerm = {
            type: "atomic",
            value: ["a", "b"]
        };
        var actualResult = stringify(atomicTerm);
        expect(actualResult).to.equal("ab");
    });
    
    it("returns right string for application term", function () {
        var applicationTerm = {
            type: "application",
            function: {
                type: "atomic",
                value: ["a"]
            },
            argument: {
                type: "atomic",
                value: ["b"]
            }
        };
        var actualResult = stringify(applicationTerm);
        expect(actualResult).to.equal("(a) b");
    });
});