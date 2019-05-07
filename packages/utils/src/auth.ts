import md5 from 'md5';

export function verifyPassword(password) {
  const hash = md5(password);
  return hash === process.env.ADMIN_PASSWORD;
}
