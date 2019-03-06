export const userSession = () => (localStorage.getItem('user') || sessionStorage.getItem('user'));

export const encodeParams = params => (
  Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&')
);

export default userSession;
