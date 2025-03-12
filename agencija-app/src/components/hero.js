import React,{Component} from 'react';
import { Navbar } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Hero extends Component{
    constructor(props){
        super(props);
        this.state={korisnik:[]};
    }
    componentDidMount()
    {
        var id=localStorage.getItem('userID');
        if(id!=null)
   { fetch("https://localhost:5001/Korisnik/VratiKorisnika/"+id, 
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
                this.setState({korisnik:sobe});
            }
        )
    })}
    }componentDidUpdate()
    {
      var id=localStorage.getItem('userID');
      fetch("https://localhost:5001/Korisnik/VratiKorisnika/"+id, 
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
                  this.setState({korisnik:sobe});
              }
          )
      })
    }
    render(){
      const {korisnik}=this.state;
      var id=localStorage.getItem('userID');
      if(id==null)
       { return(
            <section id="hero">
              <div className="container">
                <div className="row justify-content-between">
                  <div className="col-lg-7 pt-5 pt-lg-0 order-2 order-lg-1 d-flex align-items-center">
                    <div data-aos="zoom-out">
                      <h1>Želite efikasnu<span> selidbu?</span></h1>
                      <h2>Bez obzira da li je u pitanju selidba doma ili poslovnog prostora, naši radnici će organizovati i sprovesti sve faze selidbe.</h2>
                      <div className="text-center text-lg-start">
                        <a href="#about" className="btn-get-started scrollto">Kreni</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 order-1 order-lg-2 hero-img" data-aos="zoom-out" data-aos-delay={300}>
                    <img src="assets/img/pocetna11.png" className="img-fluid animated" alt="" />
                  </div>
                </div>
              </div>
              
              <svg className="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none">
                <defs>
                  <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z">
                  </path></defs>
                <g className="wave1">
                  <use xlinkHref="#wave-path" x={50} y={3} fill="rgba(255,255,255, .1)">
                  </use></g>
                <g className="wave2">
                  <use xlinkHref="#wave-path" x={50} y={0} fill="rgba(255,255,255, .2)">
                  </use></g>
                <g className="wave3">
                  <use xlinkHref="#wave-path" x={50} y={9} fill="#fff">
                  </use></g>
              </svg>
            </section>
        )}
        else{
          return(
            <section id="hero">
              <div className="container">
                <div className="row justify-content-between">
                  <div className="col-lg-7 pt-5 pt-lg-0 order-2 order-lg-1 d-flex align-items-center">
                    <div data-aos="zoom-out">
                      <h1>Dobrodošli na <span>My MSA</span> portal,</h1>
                      <h1>{korisnik.ime} {korisnik.prezime}</h1>
                      <div className="text-center text-lg-start">
                        <a href="#about" className="btn-get-started scrollto">Kreni</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 order-1 order-lg-2 hero-img" data-aos="zoom-out" data-aos-delay={300}>
                    <img src="assets/img/pocetna11.png" className="img-fluid animated" alt="" />
                  </div>
                </div>
              </div>
              
              <svg className="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none">
                <defs>
                  <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z">
                  </path></defs>
                <g className="wave1">
                  <use xlinkHref="#wave-path" x={50} y={3} fill="rgba(255,255,255, .1)">
                  </use></g>
                <g className="wave2">
                  <use xlinkHref="#wave-path" x={50} y={0} fill="rgba(255,255,255, .2)">
                  </use></g>
                <g className="wave3">
                  <use xlinkHref="#wave-path" x={50} y={9} fill="#fff">
                  </use></g>
              </svg>
            </section>
        )}
        }
    } export default Hero;