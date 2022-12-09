import { useContext, useState } from 'react';
import { Navigate } from "react-router-dom";
import LoginContext from '../../helper/context/context';
import Pop from '../../utils/pop/pop';

import './login.css';



const Login = () => {
  
  const {setUser, user} = useContext(LoginContext);
  
  const getUserName =  () => {
    const text = document.getElementById("nameText") as HTMLInputElement
    const inputText = text.value
    setUser(inputText)
  }

    return (
      
        <div>
          {user !=="" && (
            <Navigate to="/stickers" replace={true} />
                  
          )}
          <Pop id="name" name = "Please tell us your name" functionName={getUserName} />
        </div> 
      
    )
};
export default Login;
