import React from 'react'

export const AuthContext = React.createContext()

export const AuthProvider = (props) => {

    return(
        <AuthContext.Provider  >
            {props.children}
        </AuthContext.Provider>
    
    )

}


