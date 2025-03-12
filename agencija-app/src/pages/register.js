import React, {useState} from "react";
import loginImg from "../login.svg";
import { Navigate } from 'react-router-dom'
import Header from '../components/header';
import styled from 'styled-components';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'

const Container = styled.div`
width: 500px;
margin: 1em auto;
margin-top:100px;
padding:1em;
background-color: #fff;
color: #0205a1;
border: 3px solid #f0f0f0;
border-radius: 5px;
text-align: center;
box-shadow: 0 2px 4px #00000018;
@media (max-width: 700px) {
  width: 100%;
}
`;

const Register = () => {
  
  const[ime, setIme] = useState("");
  const[prezime, setPrezime] = useState("");
  const[username, setUsername] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit =  async (e) => {
   
    e.preventDefault();
    const response =  await fetch("https://localhost:5001/Korisnik/register/klijent",
    {
      method:"POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        ime:e.target.Ime.value,
        prezime:e.target.Prezime.value,
        username:e.target.Username.value,
        email:e.target.Email.value,
        password:e.target.Password.value
      })
    }).then(r=>{
        if(r.ok){
          setRedirect(true);
        }
        else
        {
          r.json().then(res=>
            {
              alert(res.message);
            })
        }
      });
  }

  

     if(redirect){
      return <Navigate to = "/login"/>}

    let auth=localStorage.getItem('user');

    if(auth==="neregistrovan")
   { 
     return (
      <div>
      <Header/>
      <Container>
      <Alert  variant="success">
        <Alert.Heading>Dobrodošli!</Alert.Heading>
        <p>
          Kreirajte novi nalog 
        </p>
      </Alert>
      <Form onSubmit={submit}>
      <Form.Group controlId="Ime">
                        <Form.Label>Ime</Form.Label>
                        <Form.Control type="text" name="Ime" required 
                        placeholder="Ime"/>
                    </Form.Group>

                    <Form.Group style={{marginTop:"10px"}} controlId="Prezime">
                        <Form.Label>Prezime</Form.Label>
                        <Form.Control type="text" name="Prezime" required 
                        placeholder="Prezime"/>
                    </Form.Group>

                    <Form.Group style={{marginTop:"10px"}} controlId="Username">
                        <Form.Label><i class="bi bi-person"></i> Username</Form.Label>
                        <Form.Control type="text" name="Username" required 
                        placeholder="UserName"/>
                    </Form.Group>

<Form.Group style={{marginTop:"10px"}} controlId="Email">
<Form.Label><i class="bi bi-envelope"></i> Email</Form.Label>
<Form.Control type="email" name="Email" required 
placeholder="Email"/>
</Form.Group>

<Form.Group style={{marginTop:"10px"}} controlId="Password">
<Form.Label><i class="bi bi-key"></i> Password</Form.Label>
<Form.Control type="password" name="Password" required 
placeholder="Password"/>
</Form.Group>

<Form.Group>
<Button style={{marginTop:"20px", marginBottom:"20px"}} variant="primary" type="submit">
     Register    <i class="fa fa-address-book"></i>
    </Button>
</Form.Group>
</Form>
<Alert>
Već imate nalog? <a href="/login" >Prijavite se ovde</a>
      </Alert>
      </Container>
     
  </div>
    
    );}
    else{
      return <Navigate to = {"/"+auth}/>
    }
  
}

export default Register;