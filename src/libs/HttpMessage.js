import { SUCCESS, BAD_REQUEST, ERROR } from './HttpStatusCodes';

export const response = (statusCode, message, data) => {
  return {
    statusCode,
    body: JSON.stringify({ message, data }, null, 2),
  };
};

export const success = (message, data) => response(SUCCESS, message, data);
export const badRequest = (message, data) => response(BAD_REQUEST, message, data);
export const error = ex => response(ERROR, ex);
