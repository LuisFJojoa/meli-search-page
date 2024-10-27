export function envToNumber(num: string | undefined) {
  if (typeof num === 'undefined') {
    return undefined;
  } else {
    return Number(num);
  }
}

export function envToBoolean(input: string | undefined) {
  return input !== undefined && input.toLowerCase() === 'true';
}

export function getEnv(env: string | undefined) {
  if (env === 'production' || env === 'prod') {
    return 'prod';
  } else if (env === 'test' || env === 'testing') {
    return 'test';
  } else {
    return 'dev';
  }
}