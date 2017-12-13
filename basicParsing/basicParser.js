var peg = require("pegjs");
var fs = require("fs");
var grammar = fs.readFileSync("./basicParsing/grammar.peg", "utf-8");

module.exports.basicParser = peg.generate(grammar);