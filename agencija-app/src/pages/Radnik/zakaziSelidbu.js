import React, {Component} from 'react';
import HeaderRadnik from '../../components/headerRadnik';
import {Navigate } from 'react-router-dom'
import {Button,ButtonToolbar,Card, Row} from 'react-bootstrap';
import SobaModal from './SobaModal';
import StvarModal from './StvarModal';
import SelidbaModal from './SelidbaModal';
import "./radnik.css"

class ZakaziSelidbu extends Component{
    constructor(props){
        super(props);
        this.state={emps:[], ModalShow:false, ModalStvarShow:false,ModalSelidbaShow:false, selidba:[],redirect:false}
    }
    refreshList()
    {
    var id=localStorage.getItem('idProcene');
    fetch("https://localhost:5001/Selidba/ListaProstorija/"+id, 
    {method: "GET"})
    .then
    (
    pKorisnik=>
    {
        if(pKorisnik.ok)
        {pKorisnik.json()
        .then
        (
            sobe=>
            {
                this.setState({emps:sobe});
            }
        )}
        else{
            this.setState({redirect:true});
        }
    })
    }

    componentDidMount()
    {
    this.refreshList();
    var id=localStorage.getItem('idProcene');
    fetch("https://localhost:5001/Selidba/PreuzmiSelidbu/"+id, 
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
    })
    }componentDidUpdate()
    {
        this.refreshList();
        var id=localStorage.getItem('idProcene');
        fetch("https://localhost:5001/Selidba/PreuzmiSelidbu/"+id, 
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
        })
    }

    delete1(id){
        fetch("https://localhost:5001/Prostorija/UkloniProstoriju/"+id,{
            method:'DELETE',
            header:{'Accept':'application/json',
        'Content-Type':'application/json'}
        })}

        delete2(id){
            fetch("https://localhost:5001/Stvar/UkloniStvar/"+id,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
}

    
    render(){
        let auth=localStorage.getItem('user');
        const {emps,selidba,redirect}=this.state;
        let ModalClose=()=>this.setState({ModalShow:false});
        let ModalStvarClose=()=>this.setState({ModalStvarShow:false});
        let ModalSelidbaClose=()=>this.setState({ModalSelidbaShow:false});
        if(redirect) return (<Navigate to = {"/radnik"}/>)
    const obavestiMe = async () => {
        let id=localStorage.getItem('userID');
        const chatMessage = {
            message: selidba.cena,
            rec: selidba.idKorisnika,
            send: id,
            tip: "klijent"
        };

        try {
            await  fetch('https://localhost:5001/Selidba/Obavesti/'+chatMessage.rec+"/"+chatMessage.message+"/"+chatMessage.send+"/"+chatMessage.tip, { 
                method: 'POST', 
                body: JSON.stringify(chatMessage),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch(e) {
            console.log('Sending message failed.', e);
        }
    }


        if(auth==="radnik"||auth==="radnikp")
        {
        return(
            <div className="Aplikacija">
            <HeaderRadnik/>
            <div style={{marginTop:'90px'}}>
                <h1 style={{margin:'10px'}}>Ukupna cena: {selidba.cena}din</h1>
                <Button  style={{margin:'10px'}}
                onClick={() => {
                this.setState({
                ModalShow: true
            })}}><i class="bi bi-plus-circle"></i> Dodaj sobu </Button>
<div className="divProstorije"style={{ display:"flex", flexWrap: 'wrap' }}>{
                    emps.map(p=>
                        <div key={p.id} style={{marginBottom:'10px'}}>
                        <Card className="Prostorija" >
                            <div class="overlayPar">
  <Card.Img className="SlikaProstorije" variant="top" src={'assets/img/sobe/'+p.slika} />
  <div class="imgOverlay">
    </div></div>
  <Card.Header as="h5"> <Button onClick={() => this.delete1(p.id)} style={{color:"black" ,backgroundColor:"rgba(255,255,255,0)", border:"none"}}>
<i class="fa fa-trash"></i></Button> {p.tip}: {p.naziv}</Card.Header>
                        <Card.Body >
                            {
                                p.stvari.map(
                                    s=>
                                    <div key={s.id}>
<i onClick={() => this.delete2(s.id)} style={{margin:"3px", cursor:"pointer"}}class="fa fa-trash"></i>
                                        <b>{s.tip}</b> {s.kolicina}✕({s.visina}{s.jedinica}✕{s.dubina}{s.jedinica}✕{s.sirina}{s.jedinica})
                                    </div>
                                )

                            }
                            <Button onClick={() => {
                                localStorage.setItem("idSoba",p.id);
                this.setState({
                ModalStvarShow: true
            })}}><i class="bi bi-plus-circle"></i> Dodaj objekat</Button>
                        </Card.Body>
</Card>
                        
                            </div>
                    )
                }</div>


            <SobaModal show={this.state.ModalShow}
               onHide={ModalClose}/>
            <StvarModal show={this.state.ModalStvarShow}
               onHide={ModalStvarClose}/>
            </div>

            <Button variant="success" style={{margin:'10px'}} onClick={obavestiMe}><i class="bi bi-check-all"></i> Gotovo</Button>

            <SelidbaModal 
            
               show={this.state.ModalSelidbaShow}
               onHide={ModalSelidbaClose}/>

            </div>
            )
        }
        else if(auth==="neregistrovan")
        {
            return <Navigate to = '/login'/>
        }
        else{
            var redirect1="/"+auth;
            return <Navigate to = {redirect1}/>
        }
    }
}export default ZakaziSelidbu;