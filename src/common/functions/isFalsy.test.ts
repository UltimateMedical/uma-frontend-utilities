import isFalsy from './isFalsy';

test('returns true on empty string', () => {
  expect(isFalsy('')).toBe(true);
});

test('returns true on 0', () => {
  expect(isFalsy(0)).toBe(true);
});

test('returns true on undefined', () => {
  expect(isFalsy(undefined)).toBe(true);
});

test('returns true on false', () => {
  expect(isFalsy(false)).toBe(true);
});

test('returns true on null', () => {
  expect(isFalsy(null)).toBe(true);
});

test('returns true on NaN', () => {
  expect(isFalsy(NaN)).toBe(true);
});