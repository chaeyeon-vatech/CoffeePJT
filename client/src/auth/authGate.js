import React from "react";
import { useUserQuery } from './useUserQuery';
import AuthenticationForm from './LoginPage';
import { useAuthToken } from './authToken';
import Private from './Private';

export const AuthGate = () => {

    // using our authToken. Can be undefined
    const [authToken] = useAuthToken()

    // trying to fetch our user data. Will fail if authToken is undefined
    const userData = useUserQuery();

    // if both are loaded, we serve our app
    if (userData.data && authToken) {
        return <Private user={userData.data.me} />;
    }
    // otherwise, we display the login form
    return <AuthenticationForm loading={userData.loading} />;
};

export default AuthGate