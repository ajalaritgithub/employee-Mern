import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import React, {  useState } from "react";
import Footer from '../Footer';
const Login = () => {

const navigate=useNavigate();
const [username,setUsername]=useState('');
const [password,setPassword]=useState('');



const userAuthentication = ()=>{

  if(username==='')
  {
    alert("Username required")
  } if(password==='')
  {
    alert("Password required")
  }
  else 
  {
      const userData=
      {
        username:username,
        password:password
      }
      axios.post(`http://localhost:8082/signin`,
      userData
      ).then((response)=>{

            if(response.data.status==="success")
            {
              let token=response.data.token;
              let userId=response.data.data[0]._id;
              let userType=response.data.data[0].usertype;
              sessionStorage.setItem("userToken",token);
              sessionStorage.setItem("userId",userId);
              sessionStorage.setItem("userType",userType);
              alert("valid user");
              navigate("/home");

            }
            else
            {
              alert("Invalid login credentials");
            }
      }
      )}
  }
  return (
    <div>
        
        <div class="d-flex justify-content-center py-3 bg-success">
                 
              <h1 class="text-white  heading">Employee App </h1>
               </div>
          


        <div> <section class="Background">
      
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-xl-6">
            <div class="card card-form" >
              <div class="row g-0">
            
                 
              <form>
                <div class="card-body p-md-5 text-black">
                <div class="d-flex justify-content-center pt-3">
                <h1 class="fw-Bolder mb-3 pb-3 headeing" >Login</h1>
                </div>
                <br/><br/>
    <div class="form-outline mb-2">
  
      <input type="text" onChange={(e)=>setUsername(e.target.value)}  class="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username" required/>
     
    </div>
    <br/>
    <div class="form-outline mb-2">
    
      <input type="password" onChange={(e)=>setPassword(e.target.value)}  class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" required/>
    </div>
    <br/>
      
  
    <br/>
    <div class="d-flex justify-content-center pt-3">
  
                     
                        <button onClick={userAuthentication} type="button" class="btn btn-secondary btn-lg ms-2">Login</button>
                      </div> 
    </div>
  </form>
      
              </div>
            </div>
          </div>
        </div>
      </div>
  
  </section>
      </div>
<Footer/>
    </div>
  )
}

export default Login