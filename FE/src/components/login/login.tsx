import React, { useState } from 'react';
import Pop from '../../utils/pop/pop';
import './login.css';



const Login = () => {
  
  const[userName, setName] = useState("");
  
  const getUserName =  () => {
    const text = document.getElementById("nameText") as HTMLInputElement
    const inputText = text.value
    setName(inputText)
  }

    return (
      
        <div>
          <Pop id="name" name = "Please tell us your name" functionName={getUserName} />
        </div> 
      
    )
};
export default Login;
