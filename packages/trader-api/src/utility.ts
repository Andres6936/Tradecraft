import type { ExternalUnauthorizedError } from "./d";

// Ref: https://stackoverflow.com/a/48100007
const toTruncate = (number: number, digits: number) =>
  Math.trunc(number * Math.pow(10, digits)) / Math.pow(10, digits);

const isUnautorizedError = (error: unknown): error is ExternalUnauthorizedError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "error" in error &&
    (error as ExternalUnauthorizedError).error === "unauthorized"
  );
};

const toError = (e: {error: string}) => {
  return {
    statusCode: 401,
    body: { message: e.error },
  } as const;
}

const toSuccess = <T,>(body: T) => {
  return {
    statusCode: 200,
    body,
  } as const;
}

export {toTruncate, isUnautorizedError, toError, toSuccess}
