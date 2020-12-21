import { useCookies } from 'react-cookie';

const TOKEN_NAME = 'Auth_Token';

// custom hook to handle authToken - we use compositon to decouple the auth system and it's storage
export const useAuthToken = () => {

    //we use react-cookies to access our cookies
    const [cookies, setCookie, removeCookie] = useCookies([TOKEN_NAME]);

    // this function allows to save any string in our cookies, under the key "authToken"
    const setAuthToken = (authToken) => setCookie(TOKEN_NAME, authToken);

    console.log(TOKEN_NAME);

    const getToken = () => removeCookie(TOKEN_NAME);

    //this function removes the key "authToken" from our cookies. Useful to logout
    const removeAuthToken = () => removeCookie(TOKEN_NAME);

    return [cookies[TOKEN_NAME], setAuthToken, removeAuthToken];
};


