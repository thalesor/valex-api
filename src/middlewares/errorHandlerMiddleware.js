
const serviceErrorToStatusCode = {
  unauthorized: 401,
  conflict: 409,
  unhandled: 500,
  not_found: 404,
  unprocessable: 422
};

export function unauthorizedError(message) {
  return { type: "unauthorized", message };
}

export function conflictError(message) {
  return { type: "conflict", message };
}

export function unhandledError(message) {
  return { type: "unhandled", message };
}

export function notFoundError(message) {
  return { type: "not_found", message };
}

export function unprocessableError(message) {
  return { type: "unprocessable", message };
}

export default function errorHandlerMiddleware(err, req, res, next) {
  if (serviceErrorToStatusCode[err.type]) {
    return res.status(serviceErrorToStatusCode[err.type]).send(err.message);
  }

  return res.status(500).send(err);
}
