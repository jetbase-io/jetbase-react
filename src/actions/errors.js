export const REQUEST_ERROR = 'REQUEST_ERROR';
export const RESET_ERROR = 'RESET_ERROR';

export const resetErrorRequest = () => ({
  type: RESET_ERROR,
});

export const responseError = message => ({
  type: REQUEST_ERROR,
  message,
});

export const resetError = () => (
  dispatch => dispatch(resetErrorRequest())
);

export default responseError;
