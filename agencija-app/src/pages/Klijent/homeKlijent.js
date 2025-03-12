import React, {Component} from 'react';
import HeaderKlijent from '../../components/headerKlijent';
import Footer from '../../components/footer';
import Hero from '../../components/hero';
import About from '../../components/about';
import Features from '../../components/features';
import Counts from '../../components/counts';
import Details from '../../components/details';
import Gallery from '../../components/gallery';
import Testimonials from '../../components/testimonials';
import Team from '../../components/team';
import FAQ from '../../components/faq';
import Contact from '../../components/contact';
import {Navigate } from 'react-router-dom'
import Toast from 'react-bootstrap/Toast'

class HomeKlijent extends Component{
    constructor(props)
    {
        super(props);
        this.state={tip:[]}
    }


    render(){
        console.log(this.props.auth);
        let auth=localStorage.getItem('user');
        if(auth==="klijent")
        {
        return(
            <div className="Aplikacija">
            <HeaderKlijent/>
            <Hero/>
            
            <main id="main">
            <About/>
            <Features/>
            <Counts/>
            <Details/>
            <Gallery/>
            <Testimonials/>
            <Team/>
            <FAQ/>
            <Contact/>
            </main>
            <Footer/>
            </div>
            )
        }
        else if(auth==="neregistrovan")
        {
            return <Navigate to = '/login'/>
        }
        else{
            var redirect="/"+auth;
            return <Navigate to = {redirect}/>
        }
    }
}export default HomeKlijent;