import { verifyPassword } from '../auth';

describe('environmental variables', () => {
  // https://stackoverflow.com/a/48042799
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules() // this is important
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });
  afterEach(() => {
    process.env = OLD_ENV;
  });

  test('check hashing success', () => {
    const password = 'hunter2';
    const expected = '2ab96390c7dbe3439de74d0c9b0b1767';

    process.env.ADMIN_PASSWORD = expected;
    expect(verifyPassword(password)).toBe(true);
  });
  test('check hashing miss', () => {
    const password = 'hunter2';
    const expected = 'not the expected hash';

    process.env.ADMIN_PASSWORD = expected;
    expect(verifyPassword(password)).toBe(false);
  });
});
