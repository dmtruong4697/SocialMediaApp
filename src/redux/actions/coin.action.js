export const buyCoinRequest = (num) => ({
  type: "BUY_COIN_REQUEST",
  payload: num,
});
export const buyCoinSuccess = (currentCoin) => ({
  type: "BUY_COIN_SUCCESS",
  payload: currentCoin,
});
export const buyCoinFailure = (errorMessage) => ({
  type: "BUY_COIN_FAILURE",
  payload: errorMessage,
});
export const updateCoinRequest = () => ({
  type: "UPDATE_COIN_REQUEST",
  payload: {},
});
export const updateCoinSuccess = (currentCoin) => ({
  type: "UPDATE_COIN_SUCCESS",
  payload: currentCoin,
});
export const updateCoinFailure = (errorMessage) => ({
  type: "UPDATE_COIN_FAILURE",
  payload: errorMessage,
});
