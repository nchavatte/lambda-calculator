var stringify = require("./stringifier");
var expect = require("chai").expect;

describe("stringifier", function () {
    it("returns right string on atomic term", function () {
        var atomicTerm = {
            type: "atomic",
            value: ["a", "b"]
        };
        var actualResult = stringify(atomicTerm);
        expect(actualResult).to.equal("ab");
    });
});