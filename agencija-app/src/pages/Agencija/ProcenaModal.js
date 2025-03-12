import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image,Dropdown,DropdownButton} from 'react-bootstrap';
import { Map, GoogleApiWrapper,InfoWindow, Marker } from 'google-maps-react';
import {Navigate } from 'react-router-dom'

const mapStyles = {
  width:"calc(100% - 32px)",
    height:"200px"
  };

class ProcenaModal extends Component{
  
    constructor(props){
        super(props);
        this.state={deps:[],redirect:false};
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
      };

    radniciLista()
    {
      var datum=localStorage.getItem("datum");
      var vreme=localStorage.getItem("vreme");
        fetch("https://localhost:5001/Pregled/PreuzmiSlobodneRadnike/"+datum+"/"+vreme)
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }
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
  handleSubmit(event)
  {
    var id=localStorage.getItem("idProcene");
    event.preventDefault();
    fetch("https://localhost:5001/Pregled/PotvrdiPreged/"+id+"/"+event.target.idR.value,{method:"PUT"})
        .then(response=>response.json())
        .then(data=>{
          this.setState({redirect:true});
            alert("Uspešno ste potvrdili procenu!");
        });
    
  }
  componentDidMount()
  {
      this.radniciLista();
  }
  componentDidUpdate()
  {
    this.radniciLista();
  }

    render(){
      const {deps}=this.state;
      const {redirect,show}=this.state;
      if(redirect) return (<Navigate to = {"/zakazaneProcene"}/>)
        return (
            <div className="container">
            <Modal
            {...this.props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Potvrdite procenu
        </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{height:"550px"}}>
            <p><i class="bi bi-calendar4"></i> Datum: <b>{this.props.datum}</b></p>
            <p><i class="bi bi-clock"></i> Vreme: <b>{this.props.vreme}:00h</b></p>
            <p><i class="bi bi-pin-map-fill"></i> Adresa: <b>{this.props.adresa}</b></p>
            <p><i class="bi bi-person-circle"></i> Klijent: <b>{this.props.klijent}</b></p>
              <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="idR">
                      <Form.Label>Odaberite radnika</Form.Label>
                        <Form.Control
                        as="select"
                        name="idR"
                        required
                        onChange={e=>this.setState({idR:e.target.value})}>
                        {
                        deps.map(m=>
                        <option key={m.id} value={m.id}>{m.ime+" "+m.prezime}</option>
                        )
                        }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Button style={{marginTop:'10px'}} variant="primary" type="submit">
                        <i class="bi bi-check-lg"></i> Potvrdite
                        </Button>
                    </Form.Group>
                </Form>
              <br/>
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
            
    </Modal.Body>

    </Modal>

            </div>
        )
    }
}export default GoogleApiWrapper({
    apiKey: "apikey"
  })(ProcenaModal);