export interface UserToken {
  issued: Date;
  email: string;
}

export function newToken(email: string): UserToken {
  return {
    issued: new Date(),
    email: email,
  };
}
