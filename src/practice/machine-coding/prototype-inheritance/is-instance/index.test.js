import { expect, describe, it } from 'vitest';
import { checkIfInstanceOf } from './index';

describe('checkIfInstanceOf', () => {
    it('should check instance', () => {
        class Animal {}
        class Dog extends Animal {}
        expect(checkIfInstanceOf(new Dog(), Animal)).toBe(true);

        expect(checkIfInstanceOf(new Date(), Date)).toBe(true);

        expect(checkIfInstanceOf(Date, Date)).toBe(false);

        expect(checkIfInstanceOf(5, Number)).toBe(true);
    });
});