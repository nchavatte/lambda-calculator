var parser = require("./basicParsing/basicParser");
var normalize = require("./normalization/normalizer");

module.exports = function(lambdaTermString){
    return normalize(parser.parse(lambdaTermString));
};