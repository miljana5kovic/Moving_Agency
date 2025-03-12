import React, {Component} from 'react';
import HeaderAgencija from '../../components/headerAgencija';
import {Navigate} from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion'
import { Button,ButtonToolbar, Form } from 'react-bootstrap';
import AddEmpModal from './addEmpModal';
import AddEmpModal1 from './addEmpModal1';


class DodajRadnika extends Component{
    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch("https://localhost:5001/Korisnik/VratiRadnike", {method: "GET"})
        .then
        (
        pKorisnik=>
        {
            pKorisnik.json()
            .then
            (
                radnik=>
                {
                    this.setState({emps:radnik});
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
            fetch("https://localhost:5001/Korisnik/ObrisiKorisnika/"+id,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {emps, empid,empname,depmt,photofilename,doj}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let addModalClose1=()=>this.setState({addModalShow1:false});

        let auth=localStorage.getItem('user');
        if(auth==="agencija")
        {
        return(
            <div className="Aplikacija">
            <HeaderAgencija/>
            <ButtonToolbar style={{marginTop:'90px'}}>
                    <Button style={{backgroundColor:"#0205a1", margin:"20px"}} variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    <i class="bi bi-plus-circle"></i> Dodaj radnika za procene</Button>
                    <Button style={{backgroundColor:"#1acc8d", margin:"20px"}} 
                    variant='primary'
                    onClick={()=>this.setState({addModalShow1:true})}>
                    <i class="bi bi-plus-circle"></i> Dodaj radnika za selidbe</Button>
                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                    <AddEmpModal1 show={this.state.addModalShow1}
                    onHide={addModalClose1}/>
            </ButtonToolbar>
        <div style={{marginTop:'10px'}}>
        <Accordion defaultActiveKey="0">
        {
        emps.map(p=>
            <div>
            {p.tipKorsinika=="radnikP"?
                <Accordion.Item style={{margin:"10px", border:"3px solid #0205a1"}} eventKey={p.id}>
                <Accordion.Header style={{color:"#0205a1"}}>{p.ime} {p.prezime}</Accordion.Header>
                <Accordion.Body>
                    {
                        p.tipKorsinika=="radnikP"?
                        <p style={{fontSize:"25px"}}>Ovaj radnik je zadužen za obavljanje procena</p>
                        :<p style={{fontSize:"25px"}}>Ovaj radnik je zadžen za obavljanje selidbi</p>
                    }
                    <Form>
                    <Form.Group >
                        <Form.Label>Email</Form.Label>
                        <Form.Control style={{width:"200px"}} type="text" name="Ime" disabled
                        value={p.email}/>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>UserName</Form.Label>
                        <Form.Control style={{width:"200px"}} type="text" name="Ime" disabled
                        value={p.username}/>
                    </Form.Group>
                        {p.timRadnika!=null?
                        
                    <Form.Group >
                        <Form.Label>Tim</Form.Label>
                        <Form.Control style={{width:"200px"}} type="text" name="Ime" disabled
                        value={p.timRadnika}/>
                    </Form.Group>
                        :<p></p>
                        }
                    </Form>
                </Accordion.Body>
               
            </Accordion.Item>
            :<Accordion.Item style={{margin:"10px", border:"3px solid #1acc8d"}} eventKey={p.id}>
            <Accordion.Header style={{color:"#0205a1"}}>{p.ime} {p.prezime}</Accordion.Header>
            <Accordion.Body>
                {
                    p.tipKorsinika=="radnikP"?
                    <p style={{fontSize:"25px"}}>Ovaj radnik je zadužen za obavljanje procena</p>
                    :<p style={{fontSize:"25px"}}>Ovaj radnik je zadžen za obavljanje selidbi</p>
                }
                <Form>
                <Form.Group >
                    <Form.Label>Email</Form.Label>
                    <Form.Control style={{width:"200px"}} type="text" name="Ime" disabled
                    value={p.email}/>
                </Form.Group>
                <Form.Group >
                    <Form.Label>UserName</Form.Label>
                    <Form.Control style={{width:"200px"}} type="text" name="Ime" disabled
                    value={p.username}/>
                </Form.Group>
                    {p.timRadnika!=null?
                    
                <Form.Group >
                    <Form.Label>Tim</Form.Label>
                    <Form.Control style={{width:"200px"}} type="text" name="Ime" disabled
                    value={p.timRadnika}/>
                </Form.Group>
                    :<p></p>
                    }
                </Form>
            </Accordion.Body>
           
        </Accordion.Item>}</div>
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
        else{
            var redirect="/"+auth;
            return <Navigate to = {redirect}/>
        }
    }
}export default DodajRadnika;