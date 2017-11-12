export const SAVE_RAFFLE = 'SAVE_RAFFLE';
export const DELETE_RAFFLE = 'DELETE_RAFFLE';

export function savedRaffleAction( lottoID, raffle ) {
  return {
    type: SAVE_RAFFLE,
    raffle,
    lottoID
  }
}

export function deleteRaffleAction( lottoID, raffle ) {
  return {
    type: DELETE_RAFFLE,
    raffle,
    lottoID
  }
}