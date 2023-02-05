import React, { useEffect } from "react";
import axios from 'axios';
// import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { Button, } from 'semantic-ui-react'
const Navbar = () => {
  const navigate=useNavigate();
    const logout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('userId');
        navigate('/')
      };
 useEffect(() => {
      
        var token=sessionStorage.getItem("userToken");
        const TokenData=
        {
          "token":token
    
        }
      axios.post(`http://localhost:7799/logincheck`,
     TokenData
      ).then((response)=>{
    
    if(response.data.status==="Unauthorised user")
    {
    alert("Login first to access this application");
    navigate('/')
    }
   
     
       })
      })
      
  return (
    <div>
         <nav class="navbar navbar-expand-lg navbar-light bg-success">
            <div class="collapse navbar-collapse Mainheader Mainheading" id="navbarTogglerDemo01">
             
              <h2 class="text-white  heading">Employee App </h2>

              <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              </ul>
    
             
    
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              
                <li class="nav-item active nav-item">
                   <Button inverted color='white'onClick={logout} > Logout</Button>
                </li>
              
    
               
    
              
    
              </ul>
            </div>
          </nav>
        </div>
  )
}

export default Navbar