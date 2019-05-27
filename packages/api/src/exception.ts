
export class InvalidApiKey extends Error {
  code: number;
  constructor(...props: any[]) {
    super(...props);
    this.message = this.constructor.name;
    this.code = 400;
  }
}
export class EmptyText extends Error {
  code: number;
  constructor(...props) {
    super(...props);
    this.message = this.constructor.name;
    this.code = 400;
  }
}
export class UserAlreadyExists extends Error {
  code: number;
  constructor(...props) {
    super(...props);
    this.message = this.constructor.name;
    this.code = 400;
  }
}
export class UserNotFound extends Error {
  code: number;
  constructor(...props) {
    super(...props);
    this.message = this.constructor.name;
    this.code = 404;
  }
}
export class NoteNotFound extends Error {
  code: number;
  constructor(...props) {
    super(...props);
    this.message = this.constructor.name;
    this.code = 404;
  }
}
export class IncorrectAuth extends Error {
  code: number;
  constructor(...props) {
    super(...props);
    this.message = this.constructor.name;
    this.code = 403;
  }
}
