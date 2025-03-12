import React, {Component} from 'react';
import HeaderAgencija from '../../components/headerAgencija';
import {Navigate } from 'react-router-dom'
import {Button,ButtonToolbar,Card, Row} from 'react-bootstrap';
import ZakazaneProceneModal from './ZakazanaProcenaModal.js'

class ZakazaneProcene extends Component{

    constructor(props)
    {
        super(props);
        this.state={pregledi:[]}
    }

    refreshList()
    {
    fetch("https://localhost:5001/Pregled/PreuzmiPotvrdjenePreglede", 
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
        if(window.confirm('Da li ste sigurni da zelite da otkazete procenu?')){
            fetch("https://localhost:5001/Pregled/UkloniPregled/"+id,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

 

    render(){
        let auth=localStorage.getItem('user');
        const {id,adresa,vreme,datum,lng,lat, radnik,klijent}=this.state;
        const {pregledi}=this.state;
        const {radnici}=this.state;
        let ModalClose=()=>this.setState({ModalShow:false});
        if(auth==="agencija")
        {
        return(
            <div className="Aplikacija">
            <HeaderAgencija/>
            <div style={{marginTop:'90px'}}>
                <div className="Pregledi">
                {
                    pregledi.map(p=>
                        <div key={p.id} style={{marginBottom:'10px'}}>
                       <Card  border="success">
                            <Card.Header as="h5" style={{color:"#17b57d"}}><i class="bi bi-calendar4"></i> Datum {p.datum}</Card.Header>
                            <Card.Body>
                                <Card.Title><i class="bi bi-clock"></i> Vreme: {p.vreme}h</Card.Title>
                                <Card.Text>
                                <i class="bi bi-pin-map-fill"></i> Adresa: {p.adresa}
                                </Card.Text>
                                <ButtonToolbar>

                                <Button  variant="primary"
                                        onClick={() => this.setState({
                                            ModalShow: true,
                                            id: p.id, adresa: p.adresa, datum: p.datum,
                                            vreme: p.vreme, status: p.status, lng: p.longtitude, lat: p.latitude, klijent:p.klijent.ime+" "+p.klijent.prezime, radnik:p.radnik.ime+" "+p.radnik.prezime
                                        })}>
                                
                                    <i class="bi bi-eye"></i> Pogledaj
                                    </Button>
                                    <Button  className="otkazi"variant="danger"
                                    onClick={() => this.delete(p.id)}>
                                    <i class="bi bi-x-circle"></i> Otkaži procenu
                                </Button>
                                </ButtonToolbar>
                                
                                </Card.Body>
                                </Card>
                                <ZakazaneProceneModal 
                                    show={this.state.ModalShow}
                                    onHide={ModalClose}
                                    id={id}
                                    lat={lat}
                                    lng={lng}
                                    adresa={adresa}
                                    vreme={vreme}
                                    datum={datum}
                                    radnik={radnik}
                                    klijent={klijent} />
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
}export default ZakazaneProcene;