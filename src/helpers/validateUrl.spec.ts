import { validateUrl } from './validateUrl';

describe('Test url validations', () => {
  it('valid urls must return true', () => {
    const test1 = validateUrl('https://github.com/BrunoMartinsMoreira');
    const test2 = validateUrl('http://github.com/BrunoMartinsMoreira');

    expect(test1).toBe(true);
    expect(test2).toBe(true);
  });

  it('Invalid urls must return false', () => {
    const test1 = validateUrl('http:github.com/BrunoMartinsMoreira');
    const test2 = validateUrl('https//github.com/BrunoMartinsMoreira');

    expect(test1).toBe(false);
    expect(test2).toBe(false);
  });
});
