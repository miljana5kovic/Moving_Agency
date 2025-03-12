import React, {Component} from 'react';
import HeaderAgencija from '../../components/headerAgencija';
import {Navigate } from 'react-router-dom'
import {Button,ButtonToolbar,Card, Row} from 'react-bootstrap';
import ProcenaModal from './ProcenaModal'


class Procene extends Component{

    constructor(props)
    {
        super(props);
        this.state={pregledi:[]}
    }

    refreshList()
    {
    fetch("https://localhost:5001/Pregled/VratiPreglede", 
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
                this.setState({pregledi:pregled,radnici:[]});
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
            fetch("https://localhost:5001/Pregled/UkloniPregled/"+id,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
    }

    listaRadnika(datum, vreme)
    {
    }

    render(){
        let auth=localStorage.getItem('user');
        const {id,adresa,vreme,datum,lng,lat, klijent}=this.state;
        const {pregledi}=this.state;
        const {radnici}=this.state;
        let ModalClose=()=>this.setState({ModalShow:false});
        if(auth==="agencija")
        {
        return(
            <div className="Aplikacija">
            <HeaderAgencija/>
            <div style={{marginTop:"90px"}}>
                <div className="Pregledi">
                {
                    pregledi.map(p=>
                        <div key={p.id} style={{marginBottom:'10px'}}>
                        <Card >
                        <Card.Header as="h5"style={{color:"#17b57d"}}><i class="bi bi-calendar4"></i> Datum {p.datum}</Card.Header>
                        <Card.Body>
                            <Card.Title><i class="bi bi-clock"></i> Vreme: {p.vreme}h</Card.Title>
                            <Card.Text as="h6">
                            <i class="bi bi-pin-map-fill"></i> Adresa: {p.adresa}
                            <br/>
                            <div style={{marginBottom:'10px'}}></div>
                            <i class="bi bi-person-circle"></i> Klijent: {p.klijent.ime} {p.klijent.prezime}
                            </Card.Text>
                            <Button  style={{marginTop:'10px'}} variant="primary"
                                    onClick={() => {
                                        localStorage.setItem("idProcene",p.id);
                                        localStorage.setItem("datum", p.datum);
                                        localStorage.setItem("vreme",p.vreme);
                                        this.setState({
                                        ModalShow: true,
                                        id: p.id, adresa: p.adresa, datum: p.datum,
                                        vreme: p.vreme, lng: p.longtitude, lat: p.latitude, klijent:p.klijent.ime+" "+p.klijent.prezime
                                    })}}>
                                   <i class="bi bi-check-lg"></i> Potvrdi zahtev za procenu
                                </Button>
                                <Button  style={{marginTop:'10px'}} className="otkazi"variant="danger"
                                    onClick={() => this.delete(p.id)}>
                                   <i class="bi bi-x-circle"></i> Odbij zahtev za procenu
                                </Button>
                            </Card.Body>
                            </Card>
                                <ProcenaModal 
                                    show={this.state.ModalShow}
                                    onHide={ModalClose}
                                    id={id}
                                    lat={lat}
                                    lng={lng}
                                    adresa={adresa}
                                    vreme={vreme}
                                    datum={datum}
                                    radnici={radnici} 
                                    klijent={klijent}/>
                            </div>
                    )
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
}export default Procene;