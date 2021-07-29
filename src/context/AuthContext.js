import React, { useContext, useState, useEffect } from "react"

export const AuthContext = React.createContext()

export const AuthProvider = (props) => {

    const [ currentUser, setCurrentUser ] = useState(null)

    return(
        <AuthContext.Provider value={{ currentUser, setCurrentUser }} >
            {props.children}
        </AuthContext.Provider>
    
    )

}


