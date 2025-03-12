import React, {Component} from 'react';
import HeaderRadnik from '../../components/headerRadnik';
import Footer from '../../components/footer';
import Hero from '../../components/hero';
import About from '../../components/about';
import Features from '../../components/features';
import Counts from '../../components/counts';
import Details from '../../components/details';
import Gallery from '../../components/gallery';
import Testimonials from '../../components/testimonials';
import Team from '../../components/team';
import Pricing from '../../components/pricing';
import FAQ from '../../components/faq';
import Contact from '../../components/contact';
import {Navigate } from 'react-router-dom'

class HomeRadnik extends Component{
    render(){
        let auth=localStorage.getItem('user');
        if(auth==="radnik"||auth==="radnikp")
        {
        return(
            <div className="Aplikacija">
            <HeaderRadnik/>
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
}export default HomeRadnik;