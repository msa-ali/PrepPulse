import { describe, it, expect, vi } from 'vitest';
import { memoize } from './index';

describe('memoize', () => {
    it('should return same result for same arguments', () => {
        const add = vi.fn((a, b) => a + b);
        const memoizedAdd = memoize(add);

        expect(memoizedAdd(2, 3)).toBe(5);
        expect(memoizedAdd(2, 3)).toBe(5);
        expect(add).toHaveBeenCalledTimes(1);
    });

    it('should compute new results for different arguments', () => {
        const multiply = vi.fn((a, b) => a * b);
        const memoizedMultiply = memoize(multiply);

        expect(memoizedMultiply(2, 3)).toBe(6);
        expect(memoizedMultiply(4, 5)).toBe(20);
        expect(multiply).toHaveBeenCalledTimes(2);
    });

    it('should work with single argument', () => {
        const square = vi.fn((x) => x * x);
        const memoizedSquare = memoize(square);

        expect(memoizedSquare(4)).toBe(16);
        expect(memoizedSquare(4)).toBe(16);
        expect(square).toHaveBeenCalledTimes(1);
    });

    it('should work with multiple arguments', () => {
        const sum = vi.fn((...args) => args.reduce((a, b) => a + b, 0));
        const memoizedSum = memoize(sum);

        expect(memoizedSum(1, 2, 3, 4)).toBe(10);
        expect(memoizedSum(1, 2, 3, 4)).toBe(10);
        expect(sum).toHaveBeenCalledTimes(1);
    });

    it('should maintain cache between separate calls', () => {
        const increment = vi.fn((x) => x + 1);
        const memoizedIncrement = memoize(increment);

        expect(memoizedIncrement(5)).toBe(6);
        expect(memoizedIncrement(5)).toBe(6);
        expect(memoizedIncrement(5)).toBe(6);
        expect(increment).toHaveBeenCalledTimes(1);
    });

    it('should handle different argument types', () => {
        const concat = vi.fn((a, b) => a + b);
        const memoizedConcat = memoize(concat);

        expect(memoizedConcat('hello', 'world')).toBe('helloworld');
        expect(memoizedConcat('hello', 'world')).toBe('helloworld');
        expect(concat).toHaveBeenCalledTimes(1);
    });
});