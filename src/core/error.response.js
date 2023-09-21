'use strict';

const StatusCode = {
  FORBIDDEN: 403,
  NOTFOUND: 404,
  CONFLICT: 409,
  INTERNAL: 500,
};

const ReasonStatusCode = {
  FORBIDDEN: 'Bad Request!',
  NOTFOUND: 'Not Found!',
  CONFLICT: 'Conflict!',
  INTERNAL: 'Internal Server Error',
};

class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
    super(message, statusCode);
  }
}

class InternalServerError extends ErrorResponse {
  constructor(message = ReasonStatusCode.INTERNAL, statusCode = StatusCode.INTERNAL) {
    super(message, statusCode);
  }
}

module.exports = { ConflictRequestError, BadRequestError, InternalServerError };
