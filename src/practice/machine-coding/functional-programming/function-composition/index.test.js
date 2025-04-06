import { expect } from "vitest";
import { compose } from ".";

describe('Compose function', () => {
    it('should compose multiple functions', () => {
        const functions = [x => x + 1, x => x * x, x => 2 * x];
        expect(compose(functions)(4)).toBe(65);
    });
})