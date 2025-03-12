import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'

const mapStyles = {
    width:"300px",
    height:"200px"
  };

class SelidbaModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
    }

    render(){
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
            <Row>
            <h4>Vasa selidba je zakazana za {this.props.datum}</h4>
            
            <ListGroup as="ol" numbered>
            {this.props.prostorije.map(p=>
            <ListGroup.Item
            key={p.id}
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                <div className="fw-bold">{p.tip}: {p.naziv}</div>
                {p.stvari.map(s=>
                            <p>
                                {s.tip}
                            </p>
                            )}
                </div>
                <Badge bg="primary" pill>
                {p.stvari.length}
                </Badge>
            </ListGroup.Item>
    )}
    
</ListGroup>
            </Row>
            
    </Modal.Body>

    </Modal>

            </div>
        )
    }
}export default SelidbaModal