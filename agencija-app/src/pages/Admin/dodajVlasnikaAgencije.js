import React from 'react';
import { Component } from 'react';
import HeaderAdmin from '../../components/headerAdmin';
import { Button,ButtonToolbar, Form } from 'react-bootstrap';
import AddEmpModal from './addEmpModal';
import Accordion from 'react-bootstrap/Accordion';
import {Navigate } from 'react-router-dom';

class DodajVlasnikaAgencije extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {emps:[], addModalShow: false, editModalShow:false}
    }

    refreshList(){
        fetch("https://localhost:5001/Korisnik/VratiVlasnika", {method: "GET"})
        .then
        (
        pKorisnik=>
        {
            pKorisnik.json()
            .then
            (
                admin=>
                {
                    this.setState({emps:admin});
                }
            )
        })
    }

    componentDidMount(){
        this.refreshList();
    }
    
    componentDidUpdate(){
        this.refreshList();
    }

    render()
    {
        const {emps, empid,empname,depmt,photofilename,doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let auth=localStorage.getItem('user');
        if(auth == "admin")
        {
        return(
            <div className = "Aplikacija">
                <HeaderAdmin/>
                <ButtonToolbar style={{marginTop:'90px'}}>
                    <Button style={{margin:"20px", backgroundColor:"#0205a1"}} variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>

                     <i class="bi bi-plus-circle"></i> Dodaj vlasnika agencije</Button>


                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
            </ButtonToolbar>
            <div style={{marginTop:'10px'}}>
            <Accordion defaultActiveKey="0">
        {
        emps.map(p=>
            <Accordion.Item style={{margin:"10px", border:"3px solid #0205a1"}} eventKey={p.id}>
                <Accordion.Header style={{color:"#0205a1"}}>{p.ime} {p.prezime}</Accordion.Header>
                <Accordion.Body>
                <Form>
                    <Form.Group style={{marginTop:"10px"}}>
                        <Form.Label><i class="bi bi-envelope"></i> Email</Form.Label>
                        <Form.Control style={{width:"200px"}} type="text" name="Ime" disabled
                        value={p.email}/>
                    </Form.Group>
                    <Form.Group style={{marginTop:"10px"}}>
                        <Form.Label><i class="bi bi-person"></i> Username</Form.Label>
                        <Form.Control style={{width:"200px"}} type="text" name="Ime" disabled
                        value={p.username}/>
                    </Form.Group>
                    </Form>
                </Accordion.Body>

 

               
            </Accordion.Item>
                    )
                }  
</Accordion>
            </div>
            </div>
        )
    }
    else if(auth == "neregistrovan")
    {
        return <Navigate to = '/login'/>
    }
    else
    {
        var redirect="/"+auth;
        return <Navigate to = {redirect}/>
    }
    }
}

export default DodajVlasnikaAgencije;