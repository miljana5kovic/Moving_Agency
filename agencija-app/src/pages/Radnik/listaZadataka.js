import React, {Component} from 'react';
import HeaderRadnik from '../../components/headerRadnik';
import {Navigate } from 'react-router-dom'
import {Button,ButtonToolbar,Card, Row} from 'react-bootstrap';
import PregledModal from './pregledModal';
import PregledSelidbaModal from './pregledSelidbaModal';
import "./radnik.css"
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/Alert'

class ListaZadataka extends Component{
    constructor(props)
    {
        super(props);
        this.state={zadaci:[1],radnik:[],prostorije:[]}
    }

    refreshList()
    {
    var id=localStorage.getItem('userID');
    fetch("https://localhost:5001/Korisnik/VratiKorisnika/"+id, 
    {method: "GET"})
    .then
    (
    pKorisnik=>
    {
        pKorisnik.json()
        .then
        (
            data=>
            {
                this.setState({radnik:data});
            }
        )
    })
    fetch("https://localhost:5001/Korisnik/ListaZadataka/"+id, 
    {method: "GET"})
    .then
    (
    pKorisnik=>
    {
        pKorisnik.json()
        .then
        (
            data=>
            {
                this.setState({zadaci:data});
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
    zavrsi(id)
    {
    fetch("https://localhost:5001/Selidba/ZavrsiSelidbu/"+id, 
    {method: "PUT"})
    .then
    (
    pKorisnik=>
    {
        
    })
    }

    render(){
        let auth=localStorage.getItem('user');
        const {zadaci,prostorije,radnik}=this.state;
        const {id,adresa,vreme,datum,lng,lat, klijent,status}=this.state;
        let ModalClose=()=>this.setState({ModalShow:false});
        let ModalSelidbaClose=()=>this.setState({ModalSelidbaShow:false});
        if(auth==="radnik"||auth==="radnikp")
        {
        return(
            <div className="Aplikacija">
            <HeaderRadnik/>
            <div style={{marginTop:'90px'}}>
                {zadaci[0]!=1?
                zadaci.length!=0?
                
                <div><h2 style={{margin:'10px'}}><i class="bi bi-list-ul"></i> Radni zadaci</h2>
                {zadaci.map(p=>
                    <div key={p.id} style={{margin:'10px'}}>
                        {radnik.tipKorsinika=="radnikP"?
                        p.status!="zapocet"?
                            <Card >
                    <Card.Header as="h5" style={{color:"#17b57d"}}><i class="bi bi-calendar4"></i> Datum {p.datum}</Card.Header>
                    <Card.Body>
                        <Card.Title><i class="bi bi-clock"></i> Vreme: {p.vreme}h</Card.Title>
                        <Card.Text>
                        <i class="bi bi-pin-map"></i> Adresa: {p.adresa}
                        </Card.Text>
                        <Card.Text>
                        <i class="bi bi-person-circle"></i> Klijent: {p.klijent.ime} {p.klijent.prezime}
                        </Card.Text>
                        <Button  variant="primary"
                                onClick={() => {
                                    localStorage.setItem("idProcene",p.id);
                                    localStorage.setItem("datum", p.datum);
                                    localStorage.setItem("vreme",p.vreme);
                                    this.setState({
                                    ModalShow: true,
                                    id: p.id, adresa: p.adresa, datum: p.datum, status:p.status,
                                    vreme: p.vreme, lng: p.longtitude, lat: p.latitude, klijent:p.klijent.ime+" "+p.klijent.prezime
                                })}}>
                               <i class="bi bi-eye"></i> Pogledaj radni zadatak
                            </Button>
                        </Card.Body>
                        </Card>
                        :<Card style={{backgroundColor:"lightgreen"}}>
                    <Card.Header as="h5"><i class="bi bi-calendar4"></i> Datum {p.datum}</Card.Header>
                    <Card.Body>
                        <Card.Title><i class="bi bi-clock"></i> Vreme: {p.vreme}h</Card.Title>
                        <Card.Text style={{color:"red"}}>
                        <i class="bi bi-exclamation-lg"></i> ovaj zadatak je već započet <i class="bi bi-exclamation-lg"></i>
                       </Card.Text>
                       <Card.Text>
                       <i class="bi bi-pin-map"></i> Adresa: {p.adresa}
                        </Card.Text>
                       <Card.Text>
                       <i class="bi bi-person-circle"></i> Klijent: {p.klijent.ime} {p.klijent.prezime}
                        </Card.Text>
                        <Button  variant="success"
                                onClick={() => {
                                    localStorage.setItem("idProcene",p.id);
                                    localStorage.setItem("datum", p.datum);
                                    localStorage.setItem("vreme",p.vreme);
                                    this.setState({
                                    ModalShow: true,
                                    id: p.id, adresa: p.adresa, datum: p.datum,
                                    vreme: p.vreme, lng: p.longtitude, status:p.status, lat: p.latitude, klijent:p.klijent.ime+" "+p.klijent.prezime
                                })}}>
                               <i class="bi bi-eye"></i> Pogledaj radni zadatak
                            </Button>
                        </Card.Body>
                        </Card>
                        :<Card style={{backgroundColor:"white"}}>
                        <Card.Header as="h5"><i class="bi bi-calendar4"></i> Datum {p.datum}</Card.Header>
                        <Card.Body>
                            <Card.Title><i class="bi bi-arrow-left"></i> Od: {p.adresaOd}</Card.Title>
                            <Card.Title><i class="bi bi-arrow-right"></i> Do: {p.adresaDo}</Card.Title>
                            <Card.Text>
                            <i class="bi bi-person-circle"></i> Klijent: {p.klijent.ime} {p.klijent.prezime}
                            </Card.Text>
                            <Button  variant="primary"
                                    onClick={() => {
                                        localStorage.setItem("idSelidba",p.id);
                                        this.setState({
                                        ModalSelidbaShow: true,
                                        prostorije:p.prostorija
                                    })}}>
                                   <i class="bi bi-eye"></i> Pogledaj radni zadatak
                                </Button>
                                {p.broj==0?<Button  variant="success" onClick={() => {
                                        this.zavrsi(p.id)}} style={{margin:"10px"}} ><i class="bi bi-check-all"></i> Završeno</Button>
                                    :<Button variant="success" onClick={() => {
                                        this.zavrsi(p.id)}}   style={{margin:"10px"}}disabled><div title="Morate da cekirate sve zadatke"><i class="bi bi-check-all"></i> Zavrseno</div></Button>}
                            </Card.Body>
                            </Card>
                        }
                    
                        
                <PregledModal   show={this.state.ModalShow}
                                onHide={ModalClose}
                                lat={lat}
                                lng={lng}
                                adresa={adresa}
                                vreme={vreme}
                                datum={datum}
                                status={status} />
                                
                <PregledSelidbaModal show={this.state.ModalSelidbaShow}
                                     onHide={ModalSelidbaClose}/>
                        </div>
                )}</div>
                    : <div>
                    <Alert className="d-block mx-auto" style={{width:"500px"}}>
                    <i class="bi bi-info-circle"></i>  Nemate nijedan radni zadatak
                </Alert>
            <Image src="assets/img/zadaci.png" className="d-block mx-auto img-fluid " />
            </div>
                :<div></div>
                }
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
}export default ListaZadataka;