export const isAuthenticated = () => {
    return sessionStorage.getItem("user") !== null;
}

export const getUserDetails = () => {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

export const logout = () => {
    sessionStorage.removeItem("user");
}