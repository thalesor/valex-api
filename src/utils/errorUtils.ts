export function notFoundError(message: string) {
  return { type: "not_found", message };
}

export function onlyOneCardPermitedError(message: string) {
  return { type: "unique", message };
}

export function unauthorizedError(message: string) {
  return { type: "unauthorized", message };
}

