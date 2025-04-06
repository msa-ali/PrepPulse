/**
 * @param {Function[]} functions
 * @return {Function}
 */
export const compose = function (functions) {
    let result;
    return function (x) {
        result = x;
        while (functions.length) {
            const fn = functions.pop();
            result = fn(result);
        }
        return result;
    }
};