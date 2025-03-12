import React,{Component} from 'react';
import { Navbar } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Pricing extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
              <section id="pricing" className="pricing">
              <div className="container">
                <div className="section-title" data-aos="fade-up">
                  <h2>Selidba</h2>
                  <p>Vaša selidba</p>
                </div>
                <div className="row" data-aos="fade-left">
                  <div className="col-lg-3 col-md-6">
                    <div className="box" data-aos="zoom-in" data-aos-delay={100}>
                      <h3>Zakaži termin pregleda</h3>
                      <h4><sup>$</sup>0<span> / month</span></h4>
                      <ul>
                        <li>Aida dere</li>
                        <li>Nec feugiat nisl</li>
                        <li>Nulla at volutpat dola</li>
                        <li className="na">Pharetra massa</li>
                        <li className="na">Massa ultricies mi</li>
                      </ul>
                      <div className="btn-wrap">
                        <a href="#hero" className="btn-buy">Buy Now</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
                    <div className="box featured" data-aos="zoom-in" data-aos-delay={200}>
                      <h3>Pregled mojih selidbi</h3>
                      <h4><sup>$</sup>19<span> / month</span></h4>
                      <ul>
                        <li>Aida dere</li>
                        <li>Nec feugiat nisl</li>
                        <li>Nulla at volutpat dola</li>
                        <li>Pharetra massa</li>
                        <li className="na">Massa ultricies mi</li>
                      </ul>
                      <div className="btn-wrap">
                        <a href="#hero" className="btn-buy">Buy Now</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
                    <div className="box" data-aos="zoom-in" data-aos-delay={300}>
                      <h3>Zakaži novu selidbu</h3>
                      <h4><sup>$</sup>29<span> / month</span></h4>
                      <ul>
                        <li>Aida dere</li>
                        <li>Nec feugiat nisl</li>
                        <li>Nulla at volutpat dola</li>
                        <li>Pharetra massa</li>
                        <li>Massa ultricies mi</li>
                      </ul>
                      <div className="btn-wrap">
                        <a href="#hero" className="btn-buy">Buy Now</a>
                      </div>
                    </div>
                  </div>
                   <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
                    <div className="box" data-aos="zoom-in" data-aos-delay={400}>
                      <span className="advanced">Advanced</span>
                      <h3>Ultimate</h3>
                      <h4><sup>$</sup>49<span> / month</span></h4>
                      <ul>
                        <li>Aida dere</li>
                        <li>Nec feugiat nisl</li>
                        <li>Nulla at volutpat dola</li>
                        <li>Pharetra massa</li>
                        <li>Massa ultricies mi</li>
                      </ul>
                      <div className="btn-wrap">
                        <a href="#hero" className="btn-buy">Buy Now</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        )
    }
}export default Pricing