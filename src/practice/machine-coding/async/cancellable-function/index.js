/**
 * @param {Generator} generator
 * @return {[Function, Promise]}
 */
export const cancellable = function (generator) {
    let cancelled = false;
    let cancelFn;

    const cancelPromise = new Promise((_, reject) => {
        cancelFn = () => {
            cancelled = true;
            reject("Cancelled");
        };
    });

    const promise = (async () => {
        let next = generator.next();

        while (!cancelled && !next.done) {
            try {
                next = generator.next(await Promise.race([next.value, cancelPromise]));
            } catch (error) {
                next = generator.throw(error)
            }
        }

        return next.value;
    })();

    return [cancelFn, promise];
};
