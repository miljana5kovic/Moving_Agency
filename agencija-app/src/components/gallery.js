import React,{Component} from 'react';
import { Navbar } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Gallery extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <section id="gallery" className="gallery">
            <div className="container">
              <div className="section-title" data-aos="fade-up">
                <h2>Galerija</h2>
                <p>Naša galerija</p>
              </div>
              <div className="row g-0" data-aos="fade-left">
                <div className="col-lg-3 col-md-4">
                  <div className="gallery-item" data-aos="zoom-in" data-aos-delay={100}>
                    <a href="assets/img/gallery/slika1.jpg" className="gallery-lightbox">
                      <img src="assets/img/gallery/slika1.jpg" alt="" className="img-fluid" />
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="gallery-item" data-aos="zoom-in" data-aos-delay={150}>
                    <a href="assets/img/gallery/slika2.jpg" className="gallery-lightbox">
                      <img src="assets/img/gallery/slika2.jpg" alt="" className="img-fluid" />
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="gallery-item" data-aos="zoom-in" data-aos-delay={200}>
                    <a href="assets/img/gallery/slika6.jpg" className="gallery-lightbox">
                      <img src="assets/img/gallery/slika6.jpg" alt="" className="img-fluid" />
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="gallery-item" data-aos="zoom-in" data-aos-delay={250}>
                    <a href="assets/img/gallery/slika10.jpg" className="gallery-lightbox">
                      <img src="assets/img/gallery/slika10.jpg" alt="" className="img-fluid" />
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="gallery-item" data-aos="zoom-in" data-aos-delay={300}>
                    <a href="assets/img/gallery/slika9.jpg" className="gallery-lightbox">
                      <img src="assets/img/gallery/slika9.jpg" alt="" className="img-fluid" />
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="gallery-item" data-aos="zoom-in" data-aos-delay={350}>
                    <a href="assets/img/gallery/slika13.jpg" className="gallery-lightbox">
                      <img src="assets/img/gallery/slika13.jpg" alt="" className="img-fluid" />
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="gallery-item" data-aos="zoom-in" data-aos-delay={400}>
                    <a href="assets/img/gallery/slika11.jpg" className="gallery-lightbox">
                      <img src="assets/img/gallery/slika11.jpg" alt="" className="img-fluid" />
                    </a>
                  </div>
                </div>
                <div className="col-lg-3 col-md-4">
                  <div className="gallery-item" data-aos="zoom-in" data-aos-delay={450}>
                    <a href="assets/img/gallery/slika12.jpg" className="gallery-lightbox">
                      <img src="assets/img/gallery/slika12.jpg" alt="" className="img-fluid" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
    }
}export default Gallery;