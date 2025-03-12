import {Doughnut } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import React,{ useEffect,useState } from "react";
Chart.register(...registerables);


function DoughnutChart() {
  const [users,setUser]=useState([])

  useEffect(()=>{
    fetch("https://localhost:5001/Selidba/DatumIVreme").then((result)=>{
      result.json().then((resp)=>{
        setUser(resp)
      })
    })
  },[])
  return (
    
    <div className="doughnut">
      <h1 style={{textAlign:"center"}}><i class="bi bi-clipboard2-pulse"></i> Preliminarni pregled zaposlenja timova tokom tekućeg meseca</h1>
      <div style={{ margin:"0 auto"}} className="doughnutChart">
      <Doughnut data={{
    labels: users.map(x=>x.tim),
    datasets:[{
        data:users.map(x=>x.brojSelidbi),
        backgroundColor:[
          'rgba(206,105,208,0.7)',
          'rgba(215,217,108,0.7)',
          'rgba(1, 4, 136, 0.7)',
          'rgba(152,195,245,0.7)',
          'rgba(96,201,135,0.6)'
        ],
        borderColor:[
          'rgba(206,105,208,1)',
          'rgba(215,217,108,1)',
          'rgba(1, 4, 136, 1)',
          'rgba(152,195,245,1)',
          'rgba(96,201,135,1)'
        ],
        borderWidth:1
    }]
}}
options= {{
  responsive:true,
  maintainAspectRatio:true
}}/>
      </div>
    </div>
  );
}

export default DoughnutChart;