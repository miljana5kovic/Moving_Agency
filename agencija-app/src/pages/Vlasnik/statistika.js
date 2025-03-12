import React, {Component} from 'react';
import HeaderVlasnik from '../../components/headerVlasnik';
import {Navigate } from 'react-router-dom'
import DoughnutChart from '../../components/doughnut';
import BarChart from '../../components/barChart';
import LineChart from '../../components/lineChart';

class Statistika extends Component{
    render(){
        let auth=localStorage.getItem('user');
        if(auth==="vlasnik")
        {
        return(
            <div className="Aplikacija">
            <HeaderVlasnik/>
            <main id="main">
            <DoughnutChart/>
            <BarChart/>
            <LineChart/>
            </main>
            </div>
            )
        }
        else if(auth==="neregistrovan")
        {
            return <Navigate to = '/'/>
        }
        else
        {
            var redirect="/"+auth;
            return <Navigate to = {redirect}/>
        }
    }
}export default Statistika;