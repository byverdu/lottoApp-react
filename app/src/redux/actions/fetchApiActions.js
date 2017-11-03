export const PRE_FETCH = 'PRE_FETCH';
export const FETCH_LOTTOS = 'FETCH_LOTTOS';
export const FETCH_RAFFLES = 'FETCH_RAFFLES';

export function fetchLottos( json ) {
  return {
    type: FETCH_LOTTOS,
    isFetching: false,
    json
  }
}

export function fetchRaffles( json ) {
  return {
    type: FETCH_RAFFLES,
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