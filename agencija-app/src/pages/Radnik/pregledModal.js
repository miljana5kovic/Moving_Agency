import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';
import {Navigate } from 'react-router-dom'



const mapStyles = {
    width:"94%",
    height:"200px"
  };
let redirect=false;
class PregledModal extends Component{
    constructor(props){
        super(props);
        this.state={redirect:false,idKlijent:[]};
        this.handleSubmit1=this.handleSubmit1.bind(this);
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

  handleSubmit1(event){
    event.preventDefault();
    var idPregled=localStorage.getItem("idProcene");
    fetch("https://localhost:5001/Selidba/NovaSelidba/"+idPregled,
  {
    method:"POST"
  }).then(r=>{
        if(r.ok)
        {
        r.json().then(res=>
            {
                redirect=true;
            })
        }
        else
        {
              alert("Doslo je do greške!");
        }

    });
    localStorage.setItem("",);
    }

    handleSubmit2(event){
      event.preventDefault();
      redirect=true;
         
      }

    render(){
       
        if(redirect)
        return <Navigate to = {"/zakaziSelidu"}/>
        return (
            <div className="container">
            <Modal
            {...this.props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Zadatak: Procena
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
            {this.props.status=="zakazano"?
              <Form onSubmit={this.handleSubmit1}>
                    <Form.Group>
                        <Button style={{marginTop:"10px"}} variant="primary" type="submit">
                           Započni procenu
                        </Button>
                    </Form.Group>
              </Form>
              :<Form onSubmit={this.handleSubmit2}>
              <Form.Group>
                  <Button style={{marginTop:"10px"}} variant="primary" type="submit">
                     Nastavi procenu
                  </Button>
              </Form.Group>
        </Form>
            }
            <p style={{marginTop:"10px"}}><i class="bi bi-calendar4"></i> Procena zakazana za: {this.props.datum}</p>
            <br/>
            <p><i class="bi bi-clock"></i> Vreme:  {this.props.vreme}h</p>
            <br/>
            <p><i class="bi bi-pin-map"></i> Na adresi: {this.props.adresa}</p>
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
            
            </Row>
            
    </Modal.Body>

    </Modal>
            </div>
        )
    }
}export default GoogleApiWrapper({
    apiKey: "apikey"
  })(PregledModal);