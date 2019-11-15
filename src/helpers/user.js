export const userSession = () => (localStorage.getItem('user') || sessionStorage.getItem('user'));
export const currentUserId = () => (localStorage.getItem('currentUserId') || sessionStorage.getItem('currentUserId'));

export default userSession;
