var expect = require("chai").expect;
var parser = require("../basicParsing/basicParser");
var normalize = require("./normalizer");

describe("normalizer", function(){
    it("returns null on atomic term", function(){
        var atomicTerm = parser.parse("x");
        var actualResult = normalize(atomicTerm);
        expect(actualResult).to.be.null;
    });
    
    it("beta-reduce application term", function(){
        var atomicTerm = parser.parse("(x=>x)y");
        var actualResult = normalize(atomicTerm);
        expect(actualResult).to.deep.equal({
            type: "atomic",
            value: ["y"]
        });
    });
    
    it("eta-reduce abstraction term", function(){
        var atomicTerm = parser.parse("x=>(f)x");
        var actualResult = normalize(atomicTerm);
        expect(actualResult).to.deep.equal({
            type: "atomic",
            value: ["f"]
        });
    });
});