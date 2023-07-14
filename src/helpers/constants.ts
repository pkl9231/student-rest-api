export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}

export enum MessageResponse {
  SUCCESS = 'success',
  ERROR = 'error',
  MISSING_REQUIRED_FIELD = 'missing required field',
  NO_CONTENT = 'no records',
  DATA_EXIST = 'data already exist',
  UNAUTHORIZED = 'user unauthorized'
}