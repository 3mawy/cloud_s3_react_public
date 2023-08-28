class Storage {
    getAccessToken() {
        return localStorage.getItem('accessToken') || null
    }

    getRefreshToken() {
        return localStorage.getItem('refreshToken') || null
    }

    setRefreshToken(refresh) {
        localStorage.setItem('refreshToken', refresh);
    }

    setAccessToken(access) {
        localStorage.setItem('accessToken', access);

    }
    removeRefreshToken() {
        localStorage.removeItem('refreshToken');    }

    removeAccessToken() {
        localStorage.removeItem('accessToken');

    }

}

export default new Storage()