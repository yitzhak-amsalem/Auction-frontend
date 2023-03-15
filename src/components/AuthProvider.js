import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

function AuthProvider(props) {
    const [updateNavbar, setUpdateNavbar] = useState(false);

    return (
        <AuthContext.Provider value={{updateNavbar, setUpdateNavbar}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;