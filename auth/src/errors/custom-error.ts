export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(messgae?: string) {
    super(messgae);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
