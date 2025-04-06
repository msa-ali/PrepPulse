import { describe, it, expect } from 'vitest';
import './index';

describe('snail traversal', () => {
    it('should handle basic 4x3 traversal', () => {
        const input = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15];
        const expected = [
            [19,17,16,15],
            [10,1,14,4],
            [3,2,12,20],
            [7,5,18,11],
            [9,8,6,13]
           ];
        expect(input.snail(5, 4)).toEqual(expected);
    });

    it('should return empty array for invalid dimensions', () => {
        const input = [1, 2, 3, 4];
        expect(input.snail(3, 3)).toEqual([]); // 9 elements needed, only 4 provided
        expect(input.snail(2, 1)).toEqual([]); // 2 elements needed, 4 provided
    });

    it('should handle single column', () => {
        const input = [1, 2, 3];
        const expected = [
            [1],
            [2],
            [3]
        ];
        expect(input.snail(3, 1)).toEqual(expected);
    });

    it('should handle single row', () => {
        const input = [1, 2, 3];
        const expected = [[1, 2, 3]];
        expect(input.snail(1, 3)).toEqual(expected);
    });

    it('should handle empty array with valid dimensions', () => {
        const input = [];
        const expected = [];
        expect(input.snail(0, 0)).toEqual(expected);
    });
});