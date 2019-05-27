
import CryptoJS from 'crypto-js';
import { IncorrectAuth, InvalidApiKey } from './exception';

function hashInput(message: string) {
  return CryptoJS.SHA3(message, { outputLength: 64 }).toString();
}

function encryptString(key: string, data: string) {
  if (!key) {
    throw new InvalidApiKey('no key provided');
  }
  return CryptoJS.AES.encrypt(data, key).toString();
}

function decryptString(key: string, encrypted: string): string {
  if (!key) {
    throw new InvalidApiKey('no key provided');
  }
  if (!encrypted) {
    return '';
  }
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, key);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedString;
  } catch (e) {
    throw new IncorrectAuth();
  }
}

interface UserToken {
  issued: Date;
  email: string;
}

function encryptUserToken(key: string, token: UserToken): string {
  const decrypted = `${token.issued.toISOString().slice(0, 10)}:${token.email}`;
  return encryptString(key, decrypted);
}

function decryptUserToken(key: string, encrypted: string): UserToken {
  const decrypted = decryptString(key, encrypted);
  const parts = decrypted.split(':');
  if (parts.length !== 2) {
    throw new InvalidApiKey('parsing user token failed');
  }
  return {
    issued: new Date(parts[0]),
    email: parts[1],
  };
}

export default {
  hashInput,
  encryptString,
  decryptString,
  encryptUserToken,
  decryptUserToken,

};
