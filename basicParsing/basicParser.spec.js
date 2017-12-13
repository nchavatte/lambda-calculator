var basicParser = require("./basicParser").basicParser;
var expect = require("chai").expect;

describe("basicParser", function () {
    describe("parse", function () {

        it("returns parsing result", function () {
            var script = "a=>ab=>a";
            var actualResult = basicParser.parse(script);
            expect(actualResult).to.not.be.null;
        });

        it("returns right-structured lambda-term object", function(){
            var script = "a=>ab=>a";
            var actualResult = basicParser.parse(script);
            expect(actualResult).to.deep.equal({
                "type": "abstraction",
                "argument": ["a"],
                "body": {
                    "type": "abstraction",
                    "argument": ["a", "b"],
                    "body": ["a"]
                }
            });
        });
    });
});