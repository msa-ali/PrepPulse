import { describe, it, expect, vi } from "vitest";
import { cancellable } from "./index";

describe("cancellable", () => {

    it('should cancel', async () => {
        function* tasks() {
            const val = yield new Promise(resolve => resolve(2 + 2));
            yield new Promise(resolve => setTimeout(resolve, 100));
            return val + 1;
        }

        const [cancel, promise] = cancellable(tasks());

        setTimeout(cancel, 50);

        try {
            await promise
        } catch (error) {
            expect(error).toBe("Cancelled");
        }
    });

    it('should resolve value', async () => {
        function* tasks() {
            const val = yield new Promise(resolve => resolve(2 + 2));
            yield new Promise(resolve => setTimeout(resolve, 100));
            return val + 1;
        }

        const [_, promise] = cancellable(tasks());

        const result = await promise;
        expect(result).toBe(5);
    });

    it('should immediately yield', async () => {
        // eslint-disable-next-line require-yield
        const generatorFunction = function* () {
            return 42;
        }
        const [cancel, promise] = cancellable(generatorFunction());
        setTimeout(cancel, 100);
        const result = await promise;
        expect(result).toBe(42);
    });
});