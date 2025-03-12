import React, {Component} from 'react';
import HeaderKlijent from '../../components/headerKlijent';
import {Navigate } from 'react-router-dom'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import {Button,ButtonToolbar,Card, Row} from 'react-bootstrap';
import PregledModal from './PregledModal';
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/Alert'

class Pregledi extends Component{

    constructor(props)
    {
        super(props);
        this.state={pregledi:[1]}
    }

    

    refreshList()
    {
    var id=localStorage.getItem('userID');
    fetch("https://localhost:5001/Pregled/VratiPregledeKorisnika/"+id, 
    {method: "GET"})
    .then
    (
    pKorisnik=>
    {
        pKorisnik.json()
        .then
        (
            pregled=>
            {
                this.setState({pregledi:pregled});
            }
        )
    })
    }

    componentDidMount()
    {
        this.refreshList();
    }

    componentDidUpdate()
    {
        this.refreshList();
    }

    delete(id){
        if(window.confirm('Da li ste sigurni da želite da otkažete procenu?')){
            fetch("https://localhost:5001/Pregled/UkloniPregled/"+id,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {id,adresa,vreme,datum,status,lng,lat,radnik}=this.state;
        const {pregledi}=this.state;
        let auth=localStorage.getItem('user');
        let ModalClose=()=>this.setState({ModalShow:false});
        if(auth==="klijent")
        {
        return(
            <div className="Aplikacija">
        
            <HeaderKlijent/>
            
            <div style={{marginTop: '90px'}}>
                <div className="Pregledi">
                {
                pregledi[0]!=1?
                pregledi.length!=0?
                    pregledi.map(p=>
                        <div key={p.id} style={{margin:'10px'}}>
                    {
                    p.status=="cekanje"
                       ? <Card >
                        <Card.Header as="h5" style={{color:"#17b57d"}}><i class="bi bi-calendar4"></i> Datum {p.datum}</Card.Header>
                        <Card.Body>
                            <Card.Title as="h5"><i class="bi bi-clock"></i> Vreme: {p.vreme}h</Card.Title>
                            <Card.Text as="h5">
                                <i class="bi bi-pin-map"></i> Adresa: {p.adresa}
                                </Card.Text>
                            <Button  style={{marginTop:'15px'}} variant="primary"
                                    onClick={() => this.setState({
                                        ModalShow: true,
                                        id: p.id, adresa: p.adresa, datum: p.datum,
                                        vreme: p.vreme, status: p.status, lng: p.longtitude, lat: p.latitude
                                    })}>
                                    <i class="bi bi-eye"></i> Pogledaj
                                </Button>
                                <Button  style={{marginTop:'15px'}} className="otkazi"variant="danger"
                                    onClick={() => this.delete(p.id)}>
                                   <i class="bi bi-x-circle"></i> Otkazi
                                </Button>
                            </Card.Body>
                            </Card>
                            :<Card  border="success">
                            <Card.Header as="h5" style={{color:"#17b57d"}}><i class="bi bi-calendar4"></i> Datum {p.datum}</Card.Header>
                            <Card.Body>
                                <Card.Title as="h5"><i class="bi bi-clock"></i> Vreme: {p.vreme}h</Card.Title>
                                <Card.Text as="h5">
                                <i class="bi bi-pin-map"></i> Adresa: {p.adresa}
                                </Card.Text>
                                <ButtonToolbar>

                                <Button style={{marginTop:'15px'}} variant="primary"
                                        onClick={() => this.setState({
                                            ModalShow: true,
                                            id: p.id, adresa: p.adresa, datum: p.datum,
                                            vreme: p.vreme, status: p.status, lng: p.longtitude, lat: p.latitude, radnik:p.radnik.ime+" "+p.radnik.prezime
                                        })}>
                                
                                <i class="bi bi-eye"></i> Pogledaj
                                    </Button>
                                </ButtonToolbar>
                                
                                </Card.Body>
                                </Card>
                            }
                            
                                <PregledModal show={this.state.ModalShow}
                                    onHide={ModalClose}
                                    lat={lat}
                                    lng={lng}
                                    adresa={adresa}
                                    vreme={vreme}
                                    datum={datum}
                                    status={status} 
                                    radnik={radnik}/>
                            </div>
                    )
                    :
                     <div>
                    <Alert className="d-block mx-auto" style={{width:"500px"}}>
                    <i class="bi bi-info-circle"></i>  Nemate zakazanu nijednu procenu
                </Alert>
            <Image src="assets/img/zavrseno.png" className="d-block mx-auto img-fluid " />
            </div>
            :<div></div>
                }
                </div>
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
}
export default Pregledi;
  