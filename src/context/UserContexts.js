import React, {useContext, useState} from "react";

const UserContext = React.createContext({})

const UserContextProvider = ({children}) => {
  const UserFromSession = JSON.parse(sessionStorage.getItem('User'))
  const [user, setUser] = useState(UserFromSession)
  return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
}


export function useUserContext(){
  const context = useContext(UserContext)
  if (!context){
    throw new Error('User context is not properly initialized')
  }
  return context;
}

export default UserContextProvider