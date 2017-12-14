function normalize(term, steps) {
    switch (term.type) {
        case "application": return normalizeApplication(term, steps);
        case "abstraction": return normalizeAbstraction(term, steps);
        default: return null;
    }
}

function normalizeApplication(application, steps) {
    var normalizedFunction = normalize(application.function, steps);
    var normalizedArgument = normalize(application.argument, steps);

    var normalizedComponentsApplication = {
        type: "application",
        function: normalizedFunction || application.function,
        argument: normalizedArgument || application.argument
    };

    var betaReducedApplication = betaReduce(normalizedComponentsApplication, steps);

    if (normalizedFunction || normalizedArgument) {
        return betaReducedApplication || normalizedComponentsApplication;
    }

    return betaReducedApplication;
}

function betaReduce(application, steps) {
    if (application.function.type != "abstraction") {
        return null;
    }

    return replace(application.function.argument, application.argument, application.function.body);
}

function replace(searchTerm, substitutionTerm, termToSearchIn) {
    switch (termToSearchIn.type) {
        case "application": return replaceApplication(searchTerm, substitutionTerm, termToSearchIn);
        case "abstraction": return replaceAbstraction(searchTerm, substitutionTerm, termToSearchIn);
        default: return replaceAtomic(searchTerm, substitutionTerm, termToSearchIn);
    }
}

function replaceApplication(searchTerm, substitutionTerm, applicationToSearchIn) {
    var replacedFunction = replace(searchTerm, substitutionTerm, applicationToSearchIn.function);
    var replacedArgument = replace(searchTerm, substitutionTerm, applicationToSearchIn.argument);

    if (!replacedFunction && !replacedArgument) {
        return null;
    }

    return {
        type: "application",
        function: replacedFunction || applicationToSearchIn.function,
        argument: replacedArgument || applicationToSearchIn.argument
    };
}

function replaceAbstraction(searchTerm, substitutionTerm, abstractionToSearchIn) {
    var replacedBody = replace(searchTerm, substitutionTerm, abstractionToSearchIn.body);

    if (!replacedBody) {
        return null;
    }

    return {
        type: "abstraction",
        argument: replacedBody
    };
}

function replaceAtomic(searchTerm, substitutionTerm, atomicTermToSearchIn) {
    if (atomicIs(atomicTermToSearchIn, searchTerm)) {
        return substitutionTerm;
    }

    return null;
}

function normalizeAbstraction(abstraction, steps) {
    var normalizedBody = normalize(abstraction.body);

    var normalizedComponentsAbstraction = {
        type: "abstraction",
        argument: abstraction.argument,
        body: normalizedBody || abstraction.body
    };

    var etaReducedAbstraction = etaReduce(normalizedComponentsAbstraction);

    if (normalizedBody) {
        return etaReducedAbstraction || normalizedComponentsAbstraction;
    }

    return etaReducedAbstraction;
}

function etaReduce(abstraction) {
    if (abstraction.body.type != "application"
        || abstraction.body.argument.type != "atomic"
        || !atomicIs(abstraction.body.argument, abstraction.argument)
        || contains(abstraction.body.function, abstraction.argument)) {
        return null;
    }

    return abstraction.body.function;
}

function contains(termToSearchIn, searchTerm) {
    switch (termToSearchIn.type) {
        case "application": return applicationContains(termToSearchIn, searchTerm);
        case "abstraction": return abstractionContains(termToSearchIn, searchTerm);
        default: return atomicIs(termToSearchIn, searchTerm);
    }
}

function applicationContains(applicationToSearchIn, searchTerm) {
    return contains(applicationToSearchIn.function, searchTerm) || contains(applicationToSearchIn.argument, searchTerm);
}

function abstractionContains(abstractionToSearchIn, searchTerm) {
    return contains(abstractionToSearchIn.body, searchTerm);
}

function atomicIs(atomicTerm, searchTerm) {
    if (atomicTerm.value.length != searchTerm.length) {
        return false;
    }

    for (i = 0; i < searchTerm.length; i++) {
        if (atomicTerm.value[i] != searchTerm[i]) {
            return false;
        }
    }

    return true;
}

module.exports = normalize;