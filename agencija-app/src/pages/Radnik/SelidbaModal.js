import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import PlacesAutocomplete, {geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import DatePicker from "react-datepicker";
import Calendar from 'react-calendar';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import {Navigate } from 'react-router-dom'

export default class SelidbaModal extends Component{
    constructor(props){
        super(props);
        this.state={tipSobe:[],selidba:[],address:"",disabled:[], date:[],startDate:new Date(),timovi:[], redirect:false};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    handleSelect(value){
        this.setState({address:value});
      }

      handleChange(value){
        this.setState({address:value});
      }


    handleSubmit(event){
        event.preventDefault();
        var id=localStorage.getItem('idProcene');
        var idTim=event.target.Tim.value;
        var date=this.state.startDate;
        var datum=date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear()+".";
        var adresa=this.state.address;
       fetch("https://localhost:5001/Selidba/OkoncajSelidbu/"+id+"/"+idTim+"/"+adresa+"/"+datum,{method: "PUT",headers: {"Content-Type":"application/json"}})
       .then(response=>response.json())
        .then(data=>{
          this.props.onHide();
        }
      );
    }


    componentDidMount()
    {
        var id=localStorage.getItem('idProcene');
        if(id!=null)
        {fetch("https://localhost:5001/Selidba/PreuzmiSelidbu/"+id, 
        {method: "GET"})
        .then
        (
        pKorisnik=>
        {
            pKorisnik.json()
            .then
            (
                sobe=>
                {
                    this.setState({selidba:sobe});
                }
            )
        })}

        var date=this.state.startDate;
        var datum=date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear()+".";
        
        fetch("https://localhost:5001/Selidba/PreuzmiSlobodneTimove/"+datum, 
        {method: "GET"})
        .then
        (
        pKorisnik=>
        {
            pKorisnik.json()
            .then
            (
                sobe=>
                {
                    this.setState({timovi:sobe});
                }
            )
        })

fetch("https://localhost:5001/Selidba/VratiZauzete",{method:"GET"})
  .then
  (
  pKorisnik=>
  {
  pKorisnik.json()
  .then
  (
    pregled=>
    {
        this.setState({disabled:pregled.map(a=>a.datum)});
    }
  )
})
    }

    componentDidUpdate()
    {
      var id=localStorage.getItem('idProcene');
      if(id!=null)
      {fetch("https://localhost:5001/Selidba/PreuzmiSelidbu/"+id, 
      {method: "GET"})
      .then
      (
      pKorisnik=>
      {
          pKorisnik.json()
          .then
          (
              sobe=>
              {
                  this.setState({selidba:sobe});
              }
          )
      })}

        var date=this.state.startDate;
        var datum=date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear()+".";
        
        fetch("https://localhost:5001/Selidba/PreuzmiSlobodneTimove/"+datum, 
        {method: "GET"})
        .then
        (
        pKorisnik=>
        {
            pKorisnik.json()
            .then
            (
                sobe=>
                {
                    this.setState({timovi:sobe});
                }
            )
        })

        fetch("https://localhost:5001/Selidba/VratiZauzete",{method:"GET"})
        .then
        (
        pKorisnik=>
        {
        pKorisnik.json()
        .then
        (
          pregled=>
          {
              this.setState({disabled:pregled.map(a=>a.datum)});
          }
        )
      })
    }

    render(){
        const {startDate, selidba,address, disabled,timovi,redirect}=this.state;
        if(redirect) return (<Navigate to = {"/radnik"}/>)
        return (
            <div className="container">

<Modal
{...this.props}
aria-labelledby="contained-modal-title-vcenter"
centered

style={{}}
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <i class="bi bi-check-all"></i> Potvrdi selidbu
        </Modal.Title>
    </Modal.Header>
    <Modal.Body
style={{height:"100%"}}>
   
                <Form onSubmit={this.handleSubmit}>

                    <Form.Group>
                        <Form.Label><i class="bi bi-arrow-left"></i> Adresa od</Form.Label>
                        <Form.Control style={{marginBottom:"10px"}} type="text" disabled
                        value={selidba.adresaOd}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label><i class="bi bi-arrow-right"></i> Adresa do</Form.Label>
                         <PlacesAutocomplete
                value={address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                
                searchOptions={{  componentRestrictions: { country: ["rs"] } }}>
                {({
                   getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                 }) => (
                    <div>
                    <input
                    style={{width:'100%'}}
                      {...getInputProps({
                      placeholder: "Unesite adresu...",
                      })}
                      />
                    <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const style = suggestion.active
                    ? { backgroundColor: "#0205a1", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };

                  return (
                    <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
                    </Form.Group>
<Form.Group controlId="Datum" style={{marginTop:'10px', width:"100%"}}>
    
<Form.Label><i class="bi bi-calendar4"></i> Datum</Form.Label>
<DatePicker 
format="dd.MM.yyyy."
  style={{marginTop:'10px', width:"100%"}}
  selected={startDate} 
  onChange={(date) => this.setState({startDate:date})} 
  minDate={moment().toDate()}
  placeholderText="Select a day"
  name="Datum"
  dayClassName={date =>disabled.indexOf( date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear()+".")>=0? 'react-datepicker__day--disabled' : undefined}
/>
</Form.Group>

<Form.Group controlId="Tim">
                        <Form.Label style={{marginTop:"10px"}}><i class="bi bi-people-fill"></i> Tim</Form.Label>
                        <Form.Control as="select" 
                        name="Tim">
                        {timovi.map(dep=>
                            <option key={dep.id} value={dep.id}>{dep.naziv}</option>)}
                        </Form.Control>
</Form.Group>
                   
                    <Form.Group>
                        <Button style={{marginTop:"20px"}} variant="primary" type="submit">
                           Zakaži selidbu
                        </Button>
                    </Form.Group>
                </Form>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Zatvori</Button>
    </Modal.Footer>

</Modal>
</div>
        )
    }

}