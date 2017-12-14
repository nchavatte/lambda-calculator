function stringify(term) {
    switch (term.type) {
        case "application": return stringifyApplication(term);
        default: return stringifyAtomic(term);
    }
}

function stringifyApplication(applicationTerm) {
    return "(" + stringify(applicationTerm.function) + ") " + stringify(applicationTerm.argument);
}

function stringifyAtomic(atomicTerm) {
    return atomicTerm.value.reduce(function (acc, c) { return acc + c; }, "");
}

module.exports = stringify;