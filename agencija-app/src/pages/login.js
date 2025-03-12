import React, {useState} from "react";
import loginImg from "../login.svg"
import {Navigate } from 'react-router-dom'
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'
import Header from '../components/header';
import styled from 'styled-components';

  
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


const Login = () => {

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[obavestenje, setOba] = useState("");
  const [redirect, setRedirect] = useState(false);

  const   submit = async (e) => {

    e.preventDefault();
    const response =  await fetch("https://localhost:5001/Korisnik/login",
    {
      mode:'cors',method:"POST",
      headers: {"Content-Type":"application/json"},
      credentials: "include",
      body: JSON.stringify({
        email:e.target.Email.value,
        password:e.target.Password.value
      })
    }).then(r=>{
        if(r.ok){
          r.json().then(res=>
            {
              console.log(res.tipKorsinika);
              if(res.tipKorsinika=="radnikP") 
              {
                console.log("Ok");
                localStorage.setItem('user',"radnik");
              }
              else
              localStorage.setItem('user',res.tipKorsinika);
              localStorage.setItem('userID',res.id);
              setRedirect(true);
            })
        }
        else
        {
          r.json().then(res=>
            {
              setOba("Pogresan Email ili Šifra")
            })
        }

      });
    }     


     let auth=localStorage.getItem('user');
     if(redirect){ 
      return <Navigate to = {"/"+auth}/>}
        return (
            <div>
              <Header/>

              <Container>
                
              <Alert  variant="success">
        <Alert.Heading>Dobrodošli nazad!</Alert.Heading>
        <p>
          Molimo Vas prijavite se putem email-a i šifre 
        </p>
      </Alert>
              <Form onSubmit={submit}>

<Form.Group controlId="Email">
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
  
<Form.Text className="text-muted">
      {obavestenje}
    </Form.Text>
    <br/>
    <Button style={{marginTop:"20px", marginBottom:"20px"}} variant="primary" type="submit">
     Login    <i class="fa fa-sign-in"></i>
    </Button>
</Form.Group>
</Form>
<Alert>
        Nemate nalog?<a href="/register" >  Prijavite se ovde</a>
      </Alert>


              </Container>
             
          </div>
          );
      
    }
    export default Login;