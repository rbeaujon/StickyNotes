import React, { createContext } from "react";


type LoginContextType = {
	user: string,
	setUser: React.Dispatch<React.SetStateAction<string>>
}

const LoginContextState = {
   user: "",
   setUser: () => {}
}

const LoginContext = createContext<LoginContextType>(LoginContextState)

export default LoginContext

