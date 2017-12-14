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
    
    it("returns right string for abstraction term", function () {
        var abstractionTerm = {
            type: "abstraction",
            argument: ["a"],
            body: {
                type: "atomic",
                value: ["b"]
            }
        };
        var actualResult = stringify(applicationTerm);
        expect(actualResult).to.equal("a => b");
    });
});