import React, {Component} from 'react';
import HeaderVlasnik from '../../components/headerVlasnik';
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
import {Navigate } from 'react-router-dom';
import Dodatak from '../../components/dodatak';

class HomeVlasnik extends Component{
    render(){
        let auth=localStorage.getItem('user');
        if(auth==="vlasnik")
        {
        return(
            <div className="Aplikacija">
            <HeaderVlasnik/>
            <Dodatak/>
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
        else
        {
            var redirect="/"+auth;
            return <Navigate to = {redirect}/>
        }
    }
}export default HomeVlasnik;