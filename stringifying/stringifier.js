function stringify(term) {
    switch (term.type) {
        case "application": return stringifyApplication(term);
        case "abstraction": return stringifyAbstraction(term);
        default: return stringifyAtomic(term);
    }
}

function stringifyApplication(applicationTerm) {
    return "(" + stringify(applicationTerm.function) + ") " + stringify(applicationTerm.argument);
}

function stringifyAbstraction(abstractionTerm) {
    var argumentString = abstractionTerm.argument.reduce(function (acc, c) { return acc + c; }, "");
    return argumentString + " => " + stringify(abstractionTerm.body);
}

function stringifyAtomic(atomicTerm) {
    return atomicTerm.value.reduce(function (acc, c) { return acc + c; }, "");
}

module.exports = stringify;