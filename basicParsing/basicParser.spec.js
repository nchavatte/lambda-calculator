var basicParser = require("./basicParser").basicParser;
var expect = require("chai").expect;

describe("basicParser", function () {
    describe("parse", function () {
        it("returns parsing result", function () {
            var script = "a=>b=>a";
            var actualResult = basicParser.parse(script);
            expect(actualResult).to.not.be.null;
        });
    });
});