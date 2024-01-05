import Cookies from "universal-cookie";

export function useToken() {
    const cookies = new Cookies()

    const access_token = cookies.get("access_token");
    const refresh_token = cookies.get("refresh_token");

    const setAccessToken = (value: string) => {
        cookies.set("access_token", value, { path: '/university', expires: new Date(Date.now() + 25920000) })
    }

    const setRefreshToken = (value: string) => {
        cookies.set("refresh_token", value, { path: '/university', expires: new Date(Date.now() + 25920000) })
    }

    const resetAccessToken = () => {
        cookies.set("access_token", undefined, { path: '/university', expires: new Date(Date.now() + 25920000) })
    }

    const resetRefreshToken = () => {
        cookies.set("refresh_token", undefined, { path: '/university', expires: new Date(Date.now() + 25920000) })
    }

    const resetTokens = () => {
        resetAccessToken()
        resetRefreshToken()
    }

    return {
        access_token,
        refresh_token,
        setAccessToken,
        resetAccessToken,
        setRefreshToken,
        resetRefreshToken,
        resetTokens
    };
}