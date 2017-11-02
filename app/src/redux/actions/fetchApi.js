export const PRE_FETCH = 'PRE_FETCH';
export const RESPONSE_FROM_API = 'RESPONSE_FROM_API';

export function responseFromApi( json ) {
  return {
    type: RESPONSE_FROM_API,
    isFetching: false,
    json
  }
}

export function preFetch() {
  return {
    type: PRE_FETCH,
    isFetching: true
  }
}