import React,{useEffect, useState} from 'react';
import { Navbar } from 'react-bootstrap';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {FaStar} from "react-icons/fa";

const colours = {
  orange:"#FFBA5A",
  
}
function Testimonials (){

  const [recenzije, setRecenzije] = useState([]);

  useEffect(() =>{
    getRecenzije();
}, [])

function getRecenzije()
{
    fetch("https://localhost:5001/Agencija/ListaOdredjenihRecenzijaPocetnaStrana")
    .then((result) => {
        result.json().then((response) => {
            //console.warn(response);
            setRecenzije(response);
            console.log(response);
           

        })
    })
}

return(

  <section id="testimonials" className="testimonials">

  <div className="container">
  

  <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
  {recenzije.map((item) =>
<SwiperSlide><div className="testimonial-item">

    <h3>Recenzija za agenciju</h3>
<h6>{item.ime}</h6>
            <div>
                      
                         <div  style={{margin:'10px'}}>
                           
                            
                             <div className = "zvezde">
                                 {[...Array(5)].map((star, i) =>
                                 {
                                     const ratingValue = i + 1;
                                     const value = item.ocena;
                                     return(
                                        <FaStar
                                        key = {i}
                                        size = {20}
                                        style = {{
                                            marginRight: 10,
                                            cursor: "pointer",
                                        }}
                                        color = {value >= (i + 1) ? colours.orange : "#a9a9a9"}
                                       
                                        />
                                       
                                    )})}
                    
                   
                            </div>

                            <p>
                           <i className="bx bxs-quote-alt-left quote-icon-left" />
                            {item.recenzijaZaAngenciju}
                           <i className="bx bxs-quote-alt-right quote-icon-right" />
                           </p> 
    
                           
                             
                           
                             </div>
                        
                    </div>

          </div></SwiperSlide>
)}


</Swiper>
</div>
</section>
)

    
}export default Testimonials;