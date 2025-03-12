import React,  {useEffect, useState} from 'react';
import { registerLocale } from 'react-datepicker';
import HeaderAgencija from '../../components/headerAgencija';
import {Button,ButtonToolbar,Card, Row, Form} from 'react-bootstrap';
import {FaStar} from "react-icons/fa";
//import {Button,ButtonToolbar,Card, Row} from 'react-bootstrap';

const colours = {
    orange:"#FFBA5A",
    
  }

  const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
    }
}
  




function PregledrecenzijaZaAngenciju ()  {

    const [recenzije, setRecenzije] = useState([]);
    const [recenzijeSelidba, setRecenzijeSelidba] = useState([]);
   
    var id=localStorage.getItem('userID');
    useEffect(() =>{
        getRecenzije();
        getRecenzijeSelidba();
    }, [])

    function getRecenzije()
    {
        fetch("https://localhost:5001/Agencija/ListaRecenzijaOcena/" + id)
        .then((result) => {
            result.json().then((response) => {
                //console.warn(response);
                setRecenzije(response);
                
               

            })
        })
    }

    function getRecenzijeSelidba()
    {
        fetch("https://localhost:5001/Selidba/ListaRecenzijaOcenaSelidba/" + id)
        .then((result) => {
            result.json().then((response) => {
                //console.warn(response);
                setRecenzijeSelidba(response);
                
               

            })
        })
    }


    function PutEvent(ID)
    {
        fetch("https://localhost:5001/Agencija/BrisanjeRecenzije/" + ID, 
        {
            method: 'PUT',
            headers: {"Content-Type":"application/json"},
           
        })
        .then(r=>{
            if(r.ok){
              alert("Brisanje je uspesno");
              getRecenzije();
            }
            else
            {
              alert("Doslo je do greske prilikom brisanja");
            }
            //setRedirect(true);
    
          });

    }

    function PutEventSelidba(ID)
    {
        fetch("https://localhost:5001/Selidba/BrisanjeRecenzijeSelidba/" + ID, 
        {
            method: 'PUT',
            headers: {"Content-Type":"application/json"},
           
        })
        .then(r=>{
            if(r.ok){
              alert("Brisanje je uspesno");
              getRecenzijeSelidba();
            }
            else
            {
              alert("Doslo je do greske prilikom brisanja");
            }
            //setRedirect(true);
    
          });

    }

    

    return(
        <div className="Aplikacija">
        <HeaderAgencija/>
      
        <div style={{marginTop:"100px"}}>

       <div className='div1'>
        <div>
            <h2 style={{margin:'10px'}} >
            Pregled svih recenzija za agenciju
            </h2>
        </div>  
          {
               
                  
             <div >
                 {
                     recenzije.map((item) =>
                     <div  style={{margin:'10px'}}>
                        <Card  border = "primary">
                            <Card.Header>
                            
                         <div className = "zvezde">
                             {[...Array(5)].map((star, i) =>
                             {
                                 const ratingValue = i + 1;
                                 const value = item.ocena;
                                 return(
                                    <FaStar
                                    key = {i}
                                    size = {30}
                                    style = {{
                                        marginRight: 10,
                                        cursor: "pointer",
                                    }}
                                    color = {value >= (i + 1) ? colours.orange : "#a9a9a9"}
                                   
                                    />
                                   
                                )})}
                
               
                        </div>
                        </Card.Header>

                        <h5 className = "naslovPom">{item.recenzijaZaAngenciju}</h5> 

                       
                         <Button   onClick = {() => PutEvent(item.id)} className="otkaziRecenziju" variant="danger" type = "submit">
                                    Obriši
                        </Button>
                       
                         </Card>
                         </div>
                     )
                 }

             </div>
             
          }

</div>

          
<div className = "div2">
          <div>
            <h2 style={{margin:'10px'}}>
            Pregled svih recenzija za selidbe
            </h2>
        </div>

          {
               
                  
               <div >
                   {
                       recenzijeSelidba.map((item) =>
                       <div  style={{margin:'10px'}}>
                          <Card  border = "primary">
                       
                          <Card.Header >
                         <div className = "zvezde">
                             {[...Array(5)].map((star, i) =>
                             {
                                 
                                 const value = item.ocena;
                                 return(
                                    <FaStar
                                    size = {30}
                                    style = {{
                                        marginRight: 10,
                                        cursor: "pointer",
                                       
                                    }}
                                    color = {value >= (i + 1) ? colours.orange : "#a9a9a9"}
                                    
                                    />

                                  
                                   
                                )})}
                
               
                        </div>
                        </Card.Header>

                        <h5 className = "naslovPom">{item.recenzijaSelidba}</h5> 
  
            
                           <Button   onClick = {() => PutEventSelidba(item.id)} className="otkaziRecenziju" variant="danger" type = "submit">
                                      Obriši
                          </Button>
                           </Card>
                           </div>
                       )
                   }
  
               </div>
            }
  
</div>
            
        </div>
       

        </div>
    )
 
}export default PregledrecenzijaZaAngenciju;