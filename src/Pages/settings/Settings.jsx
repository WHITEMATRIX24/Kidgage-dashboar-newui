import { AppBar } from '@mui/material'
import React, { useEffect } from 'react'
import "./Settings.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Settings() {
   const[adminsettings,setAdminSettings]=useState([]);
   const [loading, setLoading] = useState(true);
  //  const [adminId,setAdminId]=useState("")
   
   const navigate=useNavigate()
   const handleLogout=()=>{
     sessionStorage.clear()
         setTimeout(()=>{
       navigate('/')
     },2000)
    
   }
   {const adminId=sessionStorage.getItem('userid')
    console.log(adminId);
    
   }
    
   const FetchAdminDetails= async () =>{
    try {
        setLoading(true);
        const response = await axios.get(
            "http://localhost:5001/api/admin"
        );
        // console.log(response);
        setAdminSettings(response.data);
    } catch (error) {
        console.error("Error fetching admin details:", error);
    } finally {
        setLoading(false);
    }
};
// if(adminsettings.id == sessionStorage.getItem('userid'))
// {
//   console.log('hello');
  
//   console.log(adminsettings.id);
  
// }
console.log(adminsettings);

   
useEffect(() => {
    FetchAdminDetails();
}, []);


  return (
   <>
   {adminsettings.length>0? <div className="settings-container">
     <div className="settings-heading">
        <h1>Settings</h1>
       <div className='settings-menu'> <p>Home</p>{'>'}<p>Settings</p> </div>
     </div>
     <div className="settings-data-container">
        <div className="heading-container">
            <h4>Settings</h4>
            <Link style={{textDecoration:'none'}} onClick={handleLogout}><span className='logout'><h4>Logout</h4></span></Link>
        </div>
        <div className="username">
          <div className='uname-data'>
            <div style={{alignItems:'center'}}><p>Username</p></div>
            <div style={{alignItems:'center',marginLeft:"100px"}}><p>{sessionStorage.getItem('Name')}</p></div>
         
          </div>
        </div>
        <div className="email">
           <div className='email-data'>
           <div ><p>Email</p></div>
           <div style={{marginLeft:"140px"}} ><p>{sessionStorage.getItem('email')}</p> </div>
        
           </div>
        </div>
        <div className="password">
          <div className='pwd-data'>
          <div ><p>Password</p></div>
          <div style={{marginLeft:"110px",fontSize:'20px'}} ><p>***************</p> </div>
          <div style={{marginLeft:"25px"}} > <FontAwesomeIcon icon={faEye} style={{marginTop:'8px'}}/> </div>
          <div style={{marginLeft:"40px",color:'blue',fontSize:'13px',marginTop:'5px'}}  ><p>Change Password</p> </div>
          
          
          </div>
           
        </div>

        <div className="password">
        
           
        </div>
       
     </div>
   </div>:null}
  
   
   </>
  )
}

export default Settings