import queryString from 'query-string';

export function checkForLoginToken(): string | undefined {
  const parsed = queryString.parse(window.location.search);
  const token = parsed.token;
  if (token && typeof (token) === 'string') {
    window.location.replace('/');
    return token;
  }
}
