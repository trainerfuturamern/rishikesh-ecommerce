import {createContext, useState} from "react";

export const UserContext = createContext();

export const UserContextProvider = ({children})=>{

    const [users, setUsers] = useState(JSON.parse(localStorage.getItem("registeredUsers")) || []);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(localStorage.getItem("isAuthenticated")) || false);

    const handleUserRegister = (userData)=>{

        setUsers((prev)=>{
            const updatedUsers = [...prev, userData];
            localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
            return updatedUsers;

        });
    }

    const  userLogin = (loggedUser) => {
            setUser(loggedUser);
           setIsAuthenticated(true);
            
            localStorage.setItem("user", JSON.stringify(loggedUser));
            localStorage.setItem("isAuthenticated", JSON.stringify(true));
        },


    return(
        <UserContext.Provider value={{users,user,isAuthenticated, handleUserRegister, userLogin}}>
            {children}
        </UserContext.Provider>
    )

}