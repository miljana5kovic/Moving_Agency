import React,  {useState} from 'react';
import HeaderKlijent from '../../components/headerKlijent';
import {Navigate} from 'react-router-dom'
import {Button,ButtonToolbar,Card, Form, Row} from 'react-bootstrap';
import SelidbaModal from './SelidbaModal';
import {FaStar} from "react-icons/fa";
import Image from "react-bootstrap/Image"


const colours = {
  orange:"#FFBA5A",
  grey: "#a9a9a9"
}

const stars = Array(5).fill(0);


const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        
    },

    textarea:{
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 500,
        margin: "20px 0",
        minHeight: 130,
        padding: 10


    },

    button:{
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        padding: 10,
      
    },

}

function Recenzije (){


  const[currentValue, setCurrentValue] = React.useState(0);
  const[hoverValue, setHoverValue] = React.useState(undefined);
  const[MaxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const[recenzija, setRecenzija] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleClick = value => {
    setCurrentValue(value);
  }

  const handleMouseOver = value => {
    setHoverValue(value);
  }

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  }
  const   submit = async (e) =>
     {
  
        e.preventDefault();
        var Id = localStorage.getItem('userID');
      fetch("https://localhost:5001/Agencija/DodatiRecenzijuIOcenu/"+Id+"/" +recenzija + "/" + currentValue,
      {
   
        method:"PUT",
        headers: {"Content-Type":"application/json"},
        
      }).then(r=>{
          if(r.ok){
            alert("Uspesno je uneta recenzija");
           
          }
          else
          {
            r.text().then(
              p => {alert(p);}
            )
          }
         setRedirect(true);
  
        });
  
    }  
    let auth=localStorage.getItem('user');
    if(redirect){ 
    return <Navigate to = {"/"+auth}/>
    
  }
        

        return(
        <div className="Aplikacija">
        <HeaderKlijent/>
        <Form onSubmit = {submit}>
        <div style={{marginTop:"120px"}}>
            {
        <div style={styles.container}>
          
          <h2> Ostavite recenziju za agenciju</h2>
          <Image src="assets/img/recenzija.png" className="d-block mx-auto img-fluid " />
            
            <div style = {styles.stars}>
                {stars.map((_, index) =>{
                

                return(
                    <FaStar
                    key = {index}
                    size = {40}
                    style = {{
                        marginRight: 10,
                        cursor: "pointer",
                    }}
                    color = {(hoverValue || currentValue) > index ? colours.orange : colours.grey}
                    onClick = {() => handleClick(index + 1)}
                    onMouseOver = {() => handleMouseOver(index + 1)}
                    onMouseLeave = {handleMouseLeave}
                    onChange = {e => setCurrentValue(e.target.value)}
                    />
                   
                )})}
            </div>

            <div  className='recenzija'>
               
               {currentValue + '/' + MaxRating.length}          
           </div>

        
<Form.Group controlId = "Recenzija">
            <textarea placeholder = "Ostavite nam neki komentar"
style = {styles.textarea} className = "stilText" onChange = {e => setRecenzija(e.target.value)}/>
</Form.Group>

<Form.Group>
<Button style = {styles.button} className = "stilDugme" type = "submit">
Potvrdi
</Button>
</Form.Group>
        </div>
}
</div>
</Form>
</div>
        )
    
}export default Recenzije