import React,{Component} from 'react';
import { Navbar } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Contact extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
    
            <section id="contact" className="contact">
            <div className="container">
              <div className="section-title" data-aos="fade-up">
                <h2>Kontakt</h2>
                <p>Kontaktirajte nas</p>
              </div>
              <div className="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2902.1860375969877!2d21.890333315953967!3d43.331295979133664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4755b733e02e006f%3A0x2fd8f95c1eacfcfb!2z0JXQu9C10LrRgtGA0L7QvdGB0LrQuCDRhNCw0LrRg9C70YLQtdGCINCj0L3QuNCy0LXRgNC30LjRgtC10YLQsCDRgyDQndC40YjRgw!5e0!3m2!1ssr!2srs!4v1651933295623!5m2!1ssr!2srs" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
              <div className="row">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="info-box mb-4">
                      <i className="bx bx-map" />
                      <h3>Adresa</h3>
                      <p style={{color: '#17b57d', fontSize: '20px'}}>Aleksandra Medvedeva 14, Niš</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="info-box  mb-4">
                      <i className="bx bx-envelope" />
                      <h3>Email</h3>
                      <p style={{color: '#17b57d', fontSize: '20px'}}>mymsa@moving.com</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="info-box  mb-4">
                      <i className="bx bx-phone-call" />
                      <h3>Pozovite nas</h3>
                      <p style={{color: '#17b57d', fontSize: '20px'}}>018/529-105</p>
                    </div>
                  </div>
                </div>
              </div>
            </div></section>
        )
    }
}export default Contact;