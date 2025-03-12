import React,{Component} from 'react';
import { Navbar } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Team extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            
             <section id="team" className="team">
             <div className="container">
               <div className="section-title" data-aos="fade-up">
                 <h2>Tim</h2>
                 <p>Upoznajte naš tim</p>
               </div>
               <div className="row" data-aos="fade-left">
                 <div className="col-lg-3 col-md-6">
                   <div className="member" data-aos="zoom-in" data-aos-delay={100}>
                     <div className="pic"><img src="assets/img/team/team-1.jpg" className="img-fluid" alt="" /></div>
                     <div className="member-info">
                       <h4>Mikica Simović</h4>
                       <span>Šef radnika</span>
                       <div className="social">
                         <a href><i className="bi bi-twitter" /></a>
                         <a href><i className="bi bi-facebook" /></a>
                         <a href><i className="bi bi-instagram" /></a>
                         <a href><i className="bi bi-linkedin" /></a>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                   <div className="member" data-aos="zoom-in" data-aos-delay={200}>
                     <div className="pic"><img src="assets/img/team/team-2.jpg" className="img-fluid" alt="" /></div>
                     <div className="member-info">
                       <h4>Sara Milić</h4>
                       <span>Zamenica direktora menadžmenta</span>
                       <div className="social">
                         <a href><i className="bi bi-twitter" /></a>
                         <a href><i className="bi bi-facebook" /></a>
                         <a href><i className="bi bi-instagram" /></a>
                         <a href><i className="bi bi-linkedin" /></a>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                   <div className="member" data-aos="zoom-in" data-aos-delay={300}>
                     <div className="pic"><img src="assets/img/team/team-3.jpg" className="img-fluid" alt="" /></div>
                     <div className="member-info">
                       <h4>Stefan Perić</h4>
                       <span>Direktor menadžmenta</span>
                       <div className="social">
                         <a href><i className="bi bi-twitter" /></a>
                         <a href><i className="bi bi-facebook" /></a>
                         <a href><i className="bi bi-instagram" /></a>
                         <a href><i className="bi bi-linkedin" /></a>
                       </div>
                     </div>
                   </div>
                 </div>
                 <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                   <div className="member" data-aos="zoom-in" data-aos-delay={400}>
                     <div className="pic"><img src="assets/img/team/team-4.jpg" className="img-fluid" alt="" /></div>
                     <div className="member-info">
                       <h4>Marija Stevanović</h4>
                       <span>Vlasnica agencije</span>
                       <div className="social">
                         <a href><i className="bi bi-twitter" /></a>
                         <a href><i className="bi bi-facebook" /></a>
                         <a href><i className="bi bi-instagram" /></a>
                         <a href><i className="bi bi-linkedin" /></a>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </section>
        )
    }
}export default Team;