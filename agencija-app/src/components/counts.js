import React,{Component} from 'react';
import { Navbar } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Counts extends Component{
    constructor(props){
        super(props);
        this.state={stat:[]}
    }
    fja(){
    fetch("https://localhost:5001/Agencija/StatistikaZaKlijenta")
      .then
      (p=>{
        p.json().then(rez=>
          {
            this.setState({stat:rez});
          })
      })
    }
    componentDidMount()
    {
      this.fja();
    }
    componentDidUpdate()
    {
      this.fja();
    }
    render(){
      const{stat}=this.state;
        return(
            <section id="counts" className="counts">
            <div className="container">
              <div className="row" data-aos="fade-up">
                <div className="col-lg-3 col-md-6">
                  <div className="count-box">
                    <i className="bi bi-emoji-smile" />
                    <span data-purecounter-start={0} data-purecounter-end={232} data-purecounter-duration={1} className="purecounter" />
                    <p>Recenzija nasih klijenata</p>
                    <p><span>{stat.brojRecenzija}</span></p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                  <div className="count-box">
                    <i className="bi bi-journal-richtext" />
                    <span data-purecounter-start={0} data-purecounter-end={521} data-purecounter-duration={1} className="purecounter" />
                    <p>Obavljenih selidbi</p>
                    <p><span>{stat.brojSelidbi}</span></p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                  <div className="count-box">
                    <i className="bi bi-headset" />
                    <span data-purecounter-start={0} data-purecounter-end={1463} data-purecounter-duration={1} className="purecounter" />
                    <p>Dostupnost aplikacije</p>
                    <p><span>24/7</span></p>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                  <div className="count-box">
                    <i className="bi bi-people" />
                    <span data-purecounter-start={0} data-purecounter-end={15} data-purecounter-duration={1} className="purecounter" />
                    <p>Marljivih radnika</p>
                    <p><span>{stat.brojRadnika}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
    }
} export default Counts;