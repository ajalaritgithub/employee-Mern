import React, { useEffect, useState } from "react";
import { Table,Button } from 'semantic-ui-react'
import axios from 'axios'
import {Link} from 'react-router-dom';
import Navbar from "./Navbar";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Footer from "./Footer";

const Home = () => {
    
  const [apiData, setApiData] = useState([]);
  const [visible, setVisible] = useState(true);
 
  useEffect(() => {
      var userType=sessionStorage.getItem("userType");
         if(userType==='user')
         {
          setVisible(false);
         }
         else
         {
          setVisible(true);
         }
         axios.get('http://localhost:8082/')
      .then((getData)=>{
          setApiData(getData.data);
    })
  },[])
  const getData=()=>
    {
      axios.get('http://localhost:8082/')
      .then((getData)=>{
        setApiData(getData.data);
      })
    }
    const onDelete=(id)=>
    {
      axios.delete('http://localhost:8082/delete/'+id)
      .then((response)=>
      {if(response.data.status==="success")
      {
        alert("Employee deleted successfully");
        getData();
      }
      else
      {
        alert("Something went wrong");
      }
      })
    }
    const ConfirmDelete = (id) => {

      confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure to delete this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => onDelete(id)
          },
          {
            label: 'No',
            //onClick: () => alert('Click No')
          }
        ]
      });
    }
    const setData=(id,name,position,location,salary)=>{
      localStorage.setItem("ID",id);
      localStorage.setItem("name",name);
      localStorage.setItem("position",position);
      localStorage.setItem("location",location);
      localStorage.setItem("salary",salary);
          
    }
  return (
    <div>
<Navbar/>
 <section class="Background">
      
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col ">
            <div class="card card-table" >
              <div class="row g-0">
              <div class="d-flex justify-content-center pt-3">
              <h1 class="fw-Bolder mb-3 pb-3 headeing" >Employees List</h1>
              </div>
              <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Position</Table.HeaderCell>
        <Table.HeaderCell>Location</Table.HeaderCell>
        <Table.HeaderCell>Salary</Table.HeaderCell>
        {visible &&
        <Table.HeaderCell>Update</Table.HeaderCell>}
         {visible &&
        <Table.HeaderCell>Delete</Table.HeaderCell>}
        
      </Table.Row>
    </Table.Header>

    <Table.Body>

{apiData.map(data=>{
return(
  <Table.Row >
        <Table.Cell>{data.name}</Table.Cell>
        <Table.Cell>{data.position}</Table.Cell>
        <Table.Cell>{data.location}</Table.Cell>
        <Table.Cell>{data.salary}</Table.Cell>
        {visible &&
        <Table.Cell>
          <Link to='/update'>
          <Button color="black" onClick={()=>setData(data._id,data.name,data.position,data.location,data.salary)}>Update</Button>
          </Link>
        </Table.Cell>}
        {visible &&
        <Table.Cell>
        
          <Button color="black" onClick={()=>ConfirmDelete(data._id)}>Delete</Button>
       
        </Table.Cell>}
        
      </Table.Row>
)

     })}
    
    </Table.Body>
   
  </Table>
  </div><div class="d-flex justify-content-center pt-3">
              <Link to='/create'>
                     {visible &&<button type="button" class="btn btn-success btn-lg">Create New Employee</button>}
                     </Link>
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

export default Home