import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
    width:"calc(100% - 32px)",
    height:"200px"
  };

class PregledModal extends Component{
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
            <h4><i class="bi bi-calendar4"></i> Datum: {this.props.datum}</h4>
            <h4><i class="bi bi-clock"></i> Vreme: {this.props.vreme}h</h4>
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
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
                
                {this.props.status=='cekanje'? <p>Vaša procena još uvek nije potvrđena, radimo na tome da što pre potvrdimo. Hvala Vam na poverenju</p>
                : <p>Vaša procena je potvrđena, naš radnik:<b> {this.props.radnik} </b> će biti na vašoj adresi <i>{this.props.adresa}</i> <b>{this.props.datum} </b>
                 u <b>{this.props.vreme}h</b></p>}
                
            
    </Modal.Body>

    </Modal>

            </div>
        )
    }
}export default GoogleApiWrapper({
    apiKey: "apikey"
  })(PregledModal);