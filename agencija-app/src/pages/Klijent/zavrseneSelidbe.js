import React, {Component} from 'react';
import HeaderKlijent from '../../components/headerKlijent';
import {Navigate } from 'react-router-dom'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import {Button,ButtonToolbar,Card, Row} from 'react-bootstrap';
import SelidbaModal from './SelidbaModal';
import RecenzijeSelidba from './recenzijeSelidba';
import Image from 'react-bootstrap/Image'
import Alert from 'react-bootstrap/Alert'



class ZavrseneSelidbe extends Component{

    constructor(props)
    {
        super(props);
        this.state={selidbe:[1]}
    }

    refreshList()
    {
    var id=localStorage.getItem('userID');
    fetch("https://localhost:5001/Selidba/ListaZavrsenihSelidbi/"+id, 
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
                this.setState({selidbe:data,prostorije:[]});
            }
        )
    })
    }

    componentDidMount()
    {
        this.refreshList();
    }

    render(){
        const {selidbe, prostorije}=this.state;
        const {id,adresa,datum}=this.state;
        const {pregledi}=this.state;
        let ModalClose=()=>this.setState({ModalShow:false});
        
        let auth=localStorage.getItem('user');
        if(auth==="klijent")
        {
        return(
            <div className="Aplikacija">
            <HeaderKlijent/>
            <div style={{marginTop:"90px"}}>
            {selidbe[0]!=1?
            selidbe.length!=0?
                    selidbe.map(p=>
                        <div key={p.id} style={{margin:'10px'}}>
                         <Card border="primary">
                        <Card.Header as="h5" style={{color:"#17b57d"}}><i class="bi bi-calendar4"></i> Datum {p.datum}</Card.Header>
                        <Card.Body>
                            <Card.Title><i class="bi bi-tags"></i> Cena: {p.cena} din</Card.Title>
                            <Card.Text>
                            <i class="bi bi-arrow-left"></i> Od: {p.adresaOd} 
                            </Card.Text>
                            <Card.Text>
                            <i class="bi bi-arrow-right"></i> Do: {p.adresaDo}
                            </Card.Text>
                            <div  className='pomocniDivSelidba'>
                           

                                <Button  className = "recenzijaSelidba" variant="primary" onClick = {() => {localStorage.setItem("idSelidba", p.id)}}
                                
                                href="/recenzijeSelidba">
                                   
                                   <i class="bi bi-chat-left-text"></i> Ostavite recenziju
                                </Button>
                                </div>
                            </Card.Body>
                            </Card>
                                                           
                            </div>
                    )
                    :
                    <div>
                        
                        <Alert className="d-block mx-auto" style={{width:"500px"}}>
                        <i class="bi bi-info-circle"></i>  Nemate završenu nijednu selidbu
                        </Alert>
                    <Image src="assets/img/zavrseno.png" className="d-block mx-auto img-fluid " />
                    </div>
                    :<div></div>
                }
            </div>
            
            </div>
            )
        }
        else if(auth==="neregistrovan")
        {
            return <Navigate to = '/'/>
        }
        else{
            var redirect="/"+auth;
            return <Navigate to = {redirect}/>
        }
    }
}export default ZavrseneSelidbe;