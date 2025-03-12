import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width:"calc(100% - 32px)",
    height:"200px"
  };

class ZakazaneProceneModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
    }
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}   
      };
    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

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
            Zakazana procena
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
            <p><i class="bi bi-calendar4"></i> Datum: <b>{this.props.datum}</b></p>
            <p><i class="bi bi-clock"></i> Vreme: <b>{this.props.vreme}:00h</b></p>
            <p><i class="bi bi-pin-map-fill"></i> Adresa: <b>{this.props.adresa}</b></p>
            <p><i class="bi bi-person-circle"></i> Klijent: <b>{this.props.klijent}</b></p>
            <p><i class="bi bi-clipboard"></i> Radnik <b>{this.props.radnik}</b></p>
            <Col sm={6}>
            <Map
                google={this.props.google}
                style={mapStyles}
                zoom={14}
                initialCenter={
                {
                    lat: this.props.lat,
                    lng: this.props.lng
                }
                }
                >
            <Marker/>
            </Map>
            </Col>
            <Col sm={6}>
                <p style={{margin:"30px"}}>Ova procena je potvrđena,izvršiće je Radnik: {this.props.radnik} na adresi {this.props.adresa} {this.props.datum}  u {this.props.vreme}h
                </p>
            </Col>
            
            </Row>
            
    </Modal.Body>

    </Modal>

            </div>
        )
    }
}export default GoogleApiWrapper({
    apiKey: "apikey"
  })(ZakazaneProceneModal);