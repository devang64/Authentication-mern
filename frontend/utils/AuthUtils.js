class AuthUtils {
    static setToken(token) {
        localStorage.setItem('auth_token', token);
    }
    static removeToken() {
        localStorage.removeItem('auth_token');
    }
    static getUserAccesToken = () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            return token;
        } else {
            return null;

        }
    }
    static isUserLoggedin = () => {
        const authToken = this.getUserAccesToken();
        if (authToken) {
            return true;
        } else {
            return false;
        }
    }
}

export default AuthUtils;