import React, {useState} from "react";
import loginImg from "../login.svg"
import {Navigate } from 'react-router-dom'
import Header from '../components/header';



const Logout = (e) => {

   const [redirect, setRedirect] = useState(false);


    let auth=localStorage.getItem('user');

    if(auth!="neregistrovan")
    {
        fetch("https://localhost:5001/Korisnik/logout",
        {
        mode:'cors',method:"POST",
        }).then(r=>{
        if(r.ok){
              localStorage.setItem('user',"neregistrovan");
              localStorage.removeItem('userID');
              setRedirect(true);
        }
        else
        {
          r.json().then(res=>
            {
              alert(res.message);
            })
        }
        if(redirect){ 
            return <Navigate to = {"/"}/>}
      });
    }
    else 
    {
        return <Navigate to = {"/"}/>
    }

    }    
    export default Logout; 
