function* prototypeGenerator(obj) {
    let currentPrototype = Object.getPrototypeOf(obj);

    while(currentPrototype !== null) {
        yield currentPrototype;
        currentPrototype = Object.getPrototypeOf(currentPrototype);
    }
}


/**
 * @param {*} obj
 * @param {*} classFunction
 * @return {boolean}
 */
export const checkIfInstanceOf = function(obj, classFunction) {
    if (obj === null || obj === undefined || typeof classFunction !== 'function') {
        return false;
    }

    for (const prototype of prototypeGenerator(obj)) {
        if (prototype === classFunction.prototype) return true;
    }

    return false;
};