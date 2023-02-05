import axios from 'axios';
// import image from '../images/registration.jpg';

import {useNavigate} from 'react-router-dom' 

import React, { useState,useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';


const Update = () => {
  const navigate=useNavigate();
  const [name,setName]=useState('');
  const [position,setPosition]=useState('');
  const [location,setLocation]=useState('');
  const [salary,setSalary]=useState('');
  const [ID,setID]=useState(null);



  const sendDataToAPI = ()=>{
    // var token=sessionStorage.getItem("userToken");
    const employeeData=
    {
      "name":name,
      "position":position,
      "location":location,
      "salary":salary
    }
    axios.put(`http://localhost:8082/update/${ID}`,
 employeeData
  ).then((response)=>{
    if(response.data.status==="success")
    {
      alert("Employee updated successfully");
        navigate('/home');
    }
    else
    {
      alert("Something went wrong");
    }
    
   })
  }
 
  useEffect(()=>{
    setName(localStorage.getItem('name'));
    setPosition(localStorage.getItem('position'));
    setLocation(localStorage.getItem('location'));
    setSalary(localStorage.getItem('salary'));
    setID(localStorage.getItem('ID'));
   
    },[]
    )

  return (
    <div> 
       <Navbar/>
       <section class="Background">
     
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col ">
          <div class="card card-form" >
            <div class="row g-0">
            {/* <div class="col-xl-6 d-none d-xl-block">
            <img className='logo ms-100 w-100 vh-100 img' src={image} alt="logo"  />
                </div> */}
                <div class="col-xl-6">
            <form>
              <div class="card-body p-md-5 text-black">
              <div class="d-flex justify-content-center pt-3">
              <h1 class="fw-Bolder mb-3 pb-3 headeing" >Employee Form</h1>
              </div>
              <br/><br/>
  <div class="form-outline mb-2">

    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} class="form-control form-control-lg" id="exampleInputEmail1"  aria-describedby="emailHelp" placeholder="Name"/>
   
  </div>
  <br/>
  <div class="form-outline mb-2">
  
    <input type="text" value={position} onChange={(e)=>setPosition(e.target.value)} class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Designation"/>
  </div>
  <br/>
 <div class="form-outline mb-2">
  
    <input type="text"  value={location} onChange={(e)=>setLocation(e.target.value)} class="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Location"/>
   
  </div>
  <br/>
  <div class="form-outline mb-2">
  
    <input type="text" value={salary} onChange={(e)=>setSalary(e.target.value)} class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Salary"/>
  </div>
  <br/>
  <div class="d-flex justify-content-center pt-3">
                      <button onClick={sendDataToAPI} type="button" className="btn btn-secondary btn-lg ms-2">Update</button>
                    </div> 
  </div>
</form>
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>

</section>
<Footer/>
    </div>
  )
}

export default Update