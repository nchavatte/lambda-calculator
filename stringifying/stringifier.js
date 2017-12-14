function stringify(term) {
    switch (term.type) {
        default: return stringifyAtomic(term);
    }
}

function stringifyAtomic(atomicTerm) {
    return atomicTerm.value.reduce(function(acc, c){ return acc + c; }, "");
}

module.exports = stringify;