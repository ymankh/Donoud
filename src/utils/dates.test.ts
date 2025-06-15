import { describe, it, expect } from 'vitest';
import { formatDate } from './dates';

describe('formatDate', () => {
  it('handles midnight as 12 AM and pads minutes', () => {
    const date = new Date('2020-01-01T00:05:00');
    expect(formatDate(date)).toBe('12:05 AM');
  });

  it('converts afternoon times to PM', () => {
    const date = new Date('2020-01-01T15:07:00');
    expect(formatDate(date)).toBe('3:07 PM');
  });

  it('keeps noon as 12 PM', () => {
    const date = new Date('2020-01-01T12:09:00');
    expect(formatDate(date)).toBe('12:09 PM');
  });
});
