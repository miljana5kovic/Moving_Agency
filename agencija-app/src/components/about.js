import React,{Component} from 'react';
import { Navbar } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Navigate } from 'react-router-dom'

class About extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <section id="about" className="about">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-5 col-lg-6 video-box d-flex justify-content-center align-items-stretch" data-aos="fade-right">
                  <a href="https://www.youtube.com/watch?v=_fakQVKZCO8" className="venobox play-btn mb-4" data-vbtype="video" data-autoplay="true" />
                </div>
                <div className="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5" data-aos="fade-left">
                  <h4>O nama</h4>
                  <h3>My Moving and Storage Agency</h3>
                  <p>Mi smo profesionalna agencija za selidbe, odnosno transport nameštaja i druge robe. Vršimo kombi i kamionski transport stvari i nameštaja, utovar i istovar, kao i mnoge druge dodatne usluge poput zaštite, pakovanja, demontaže-montaže, skladištenja nameštaja i robe. Poznajući dobro potrebe naših mušterija pružamo uslugu kompletne selidbe po principu ključ u ruke.</p>
                  <div className="icon-box" data-aos="zoom-in" data-aos-delay={200}>
                    <div className="icon" ><i className="bx bx-time" /></div>
                    <h4 className="title"><a href="/zakaziPregled">Zakazite Procenu</a></h4>
                    <p className="description">Mogućnost zakazivanja 7 dana u nedelji, zakažite kad Vama najviše odgovara</p>
                  </div>
                  <div className="icon-box" data-aos="zoom-in" data-aos-delay={100}>
                    <div className="icon"><i className="bx bx-calculator" /></div>
                    <h4 className="title"><a href="/pregledi">Procena selidbe</a></h4>
                    <p className="description">Naši operateri će besplatno proceniti cenu selidbe. Bez skrivenih troškova i oscilacije u ceni.</p>
                  </div>
                  <div className="icon-box" data-aos="zoom-in" data-aos-delay={300}>
                    <div className="icon"><i className="bi bi-geo-alt-fill" /></div>
                    <h4 className="title"><a href="/selidbe">Selidba</a></h4>
                    <p className="description">Naši radnici će izvršiti sve potrebne faze vaše relokacije.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
    }
} export default About;