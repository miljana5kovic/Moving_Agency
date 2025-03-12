import React, {Component} from 'react';
import HeaderVlasnik from '../../components/headerVlasnik';
import {Navigate } from 'react-router-dom'
import HeaderAgencija from '../../components/headerAgencija';
import Accordion from 'react-bootstrap/Accordion'
import { Button,ButtonToolbar,Form } from 'react-bootstrap';
import AddEmpModal from './addEmpModal';


class DodajAdministraciju extends Component{constructor(props){
    super(props);
    this.state={emps:[], addModalShow:false, editModalShow:false}
}

refreshList(){
    fetch("https://localhost:5001/Korisnik/VratiAdministraciju", {method: "GET"})
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

delete(id){
    if(window.confirm('Da li ste sigurni?')){
        fetch("https://localhost:5001/Korisnik/ObrisiKorisnika"+id,{
            method:'DELETE',
            header:{'Accept':'application/json',
        'Content-Type':'application/json'}
        })
    }
}
    render(){
        const {emps, empid,empname,depmt,photofilename,doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let auth=localStorage.getItem('user');
        if(auth==="vlasnik")
        {
        return(
            <div className="Aplikacija">
            <HeaderVlasnik/>
            <ButtonToolbar style={{marginTop:'90px'}}>
                    <Button style={{margin:"20px", backgroundColor:"#0205a1"}} variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    <i class="bi bi-plus-circle"></i> Dodaj radnika administracije</Button>
                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
            </ButtonToolbar>
        <div style={{marginTop:'10px'}}>
        <Accordion defaultActiveKey="0">
        {
        emps.map(p=>
            <Accordion.Item style={{margin:"10px", border:"3px solid #0205a1"}} eventKey={p.id}>
                <Accordion.Header>{p.ime} {p.prezime}</Accordion.Header>
                <Accordion.Body>
                <Form.Group >
                        <Form.Label><i class="bi bi-envelope"></i> Email</Form.Label>
                        <Form.Control style={{width:"200px"}} type="text" name="Ime" disabled
                        value={p.email}/>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label style={{marginTop:"10px"}}><i class="bi bi-person"></i> User name</Form.Label>
                        <Form.Control style={{width:"200px"}} type="text" name="Ime" disabled
                        value={p.username}/>
                    </Form.Group>
                </Accordion.Body>
               
            </Accordion.Item>
                    )
                }
                
</Accordion>
        </div>
            </div>
            )
        }
        else if(auth==="neregistrovan")
        {
            return <Navigate to = '/login'/>
        }
        else
        {
            var redirect="/"+auth;
            return <Navigate to = {redirect}/>
        }
    }
}export default DodajAdministraciju;