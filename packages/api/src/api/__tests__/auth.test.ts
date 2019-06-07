import auth from '../auth';
import { toJSON } from './testhelper';

describe('encryption', () => {

  test('encrypt/decrypt string', () => {
    const key = '12345';
    const data = 'secret';

    const encrypted = auth.encryptString(key, data);
    const decrypted = auth.decryptString(key, encrypted);

    const expected = toJSON(data);
    const result = toJSON(decrypted);
    expect(result).toBe(expected);
  });

  test('encryptString raises error', () => {
    const key = '';
    const data = 'secret';

    expect(() => auth.encryptString(key, data))
      .toThrow(Error);
  });

  test('encrypt/decrypt UserToken', () => {
    const key = '12345';
    const token = {
      issued: new Date('2019-05-27T19:50:35.617Z'),
      email: 'test@gmail.com',
    };

    const encrypted = auth.encryptUserToken(key, token);
    const decrypted = auth.decryptUserToken(key, encrypted);

    const expected = toJSON({
      issued: new Date('2019-05-27'),
      email: 'test@gmail.com',
    });
    const result = toJSON(decrypted);
    expect(result).toBe(expected);
  })
});
