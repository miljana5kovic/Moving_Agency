import React,{Component} from 'react';
import { Navbar } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Features extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            
            <section id="features" className="features">
            <div className="container">
              <div className="section-title" data-aos="fade-up">
                <h2>Usluge</h2>
                <p>Pregled usluga</p>
              </div>
              <div className="row" data-aos="fade-left">
                <div className="col-lg-3 col-md-4">
                  <div className="icon-box" data-aos="zoom-in" data-aos-delay={50}>
                    <i className="ri-truck-line" style={{color: '#ffbb2c'}} />
                    <h3><a href>Kombi/kamion selidbe i prevoz</a></h3>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
                  <div className="icon-box" data-aos="zoom-in" data-aos-delay={100}>
                    <i className="bx bx-bed" style={{color: '#5578ff'}} />
                    <h3><a href>Zaštita nameštaja</a></h3>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4 mt-md-0">
                  <div className="icon-box" data-aos="zoom-in" data-aos-delay={150}>
                    <i className="bx bx-package" style={{color: '#e80368'}} />
                    <h3><a href>Demontaža-montaža, priprema i pakovanje</a></h3>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4 mt-lg-0">
                  <div className="icon-box" data-aos="zoom-in" data-aos-delay={200}>
                    <i className="bx bx-building-house" style={{color: '#e361ff'}} />
                    <h3><a href>Selidba doma i poslovnog prostora</a></h3>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                  <div className="icon-box" data-aos="zoom-in" data-aos-delay={250}>
                    <i className="bx bx-transfer" style={{color: '#47aeff'}} />
                    <h3><a href>Najam radnika za utovar-istovar</a></h3>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                  <div className="icon-box" data-aos="zoom-in" data-aos-delay={300}>
                    <i className="bx bx-chat" style={{color: '#ffa76e'}} />
                    <h3><a href>Besplatna procena selidbe</a></h3>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                  <div className="icon-box" data-aos="zoom-in" data-aos-delay={350}>
                    <i className="bx bx-time-five" style={{color: '#11dbcf'}} />
                    <h3><a href>Dostupnost usluga aplikacije 24/7</a></h3>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                  <div className="icon-box" data-aos="zoom-in" data-aos-delay={400}>
                    <i className="bx bx-wallet" style={{color: '#4233ff'}} />
                    <h3><a href>Unapred planiranje troškova</a></h3>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                  <div className="icon-box" data-aos="zoom-in" data-aos-delay={450}>
                    <i className="bx bx-question-mark" style={{color: '#b2904f'}} />
                    <h3><a href>Otvoreni smo za sva Vaša pitanja</a></h3>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                  <div className="icon-box" data-aos="zoom-in" data-aos-delay={500}>
                    <i className="bi bi-calendar" style={{color: '#b20969'}} />
                    <h3><a href>Selidba za jedan dan</a></h3>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                  <div className="icon-box" data-aos="zoom-in" data-aos-delay={550}>
                    <i className="bi bi-geo-alt" style={{color: '#ff5828'}} />
                    <h3><a href>Selidbe svih mesta u Srbiji</a></h3>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4 mt-4">
                  <div className="icon-box" data-aos="zoom-in" data-aos-delay={600}>
                    <i className="bi bi-telephone-inbound" style={{color: '#29cc37'}} />
                    <h3><a href>365 dana u godini Vama na usluzi</a></h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
    }
}export default Features;