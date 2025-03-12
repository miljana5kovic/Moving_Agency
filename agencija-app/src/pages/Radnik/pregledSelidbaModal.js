import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'

const mapStyles = {
    width:"300px",
    height:"200px"
  };

class PregledSelidbaModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[], prostorije:[], broj:0};
    }

    zavrsi(id,status)
    {
        if(status=="pocetak")
        {
            fetch('https://localhost:5001/Stvar/PromeniStatus/'+id+"/"+"kraj", { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
            else{
                
                    fetch('https://localhost:5001/Stvar/PromeniStatus/'+id+"/"+"pocetak", { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }

    zavrsiProstorija(id,status)
    {
        if(status=="pocetak")
        {
            fetch('https://localhost:5001/Prostorija/PromeniStatus/'+id+"/"+"kraj", { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
            else{
                
                    fetch('https://localhost:5001/Prostorija/PromeniStatus/'+id+"/"+"pocetak", { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    }

    componentDidMount()
    {
        var id=localStorage.getItem("idSelidba");
        var t=0;
        if(id!=null)
        {fetch("https://localhost:5001/Selidba/ListaProstorija1/"+id, 
        {method: "GET"})
        .then
        (
        pKorisnik=>
        {if(pKorisnik.ok)
            {pKorisnik.json()
            .then
            (
                data=>
                {
                    this.setState({prostorije:data});
                }
            )}
        })}
    }

    componentDidUpdate()
    {
        var id=localStorage.getItem("idSelidba");
        var t=0;
        if(id!=null)
        {fetch("https://localhost:5001/Selidba/ListaProstorija1/"+id, 
        {method: "GET"})
        .then
        (
        pKorisnik=>
        {
            if(pKorisnik.ok)
            {pKorisnik.json()
            .then
            (
                data=>
                {
                    this.setState({prostorije:data});
                }
            )}
        })}
    }

    render(){
        const {prostorije,broj}=this.state;
        return (
            <div className="container">
            <Modal
            {...this.props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Zakazana selidba
        </Modal.Title>
        </Modal.Header>
        <Modal.Body
        style={{
            maxHeight: 'calc(100vh - 210px)',
            overflowY: 'auto'
           }}>
            <ListGroup as="ol" numbered>
            {prostorije.map(p=>
            <ListGroup.Item
            key={p.id}
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    <div>
                <div className="fw-bold" style={{cursor: "pointer"}}  onClick={() => this.zavrsiProstorija(p.id, p.status)}>{p.tip}: {p.naziv}</div></div>


                {p.stvari.map(s=>
                <div>
                    {
                        s.status=="kraj"?
                        <p style={{color:"green", cursor: "pointer",textDecoration:"line-through" }} onClick={() => this.zavrsi(s.id)}>
                            {s.tip}
                        </p>
                        :<p  style={{cursor: "pointer"}} onClick={() => this.zavrsi(s.id, s.status)}>
                        {s.tip}
                    </p>
                    }
                </div>
                            
                            )}
                </div>
                <Badge bg="primary" pill>
                {p.broj}
                </Badge>
            </ListGroup.Item>
    )}
    
</ListGroup>
            
    </Modal.Body>

    </Modal>

            </div>
        )
    }
}export default PregledSelidbaModal