import {Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import React,{ useEffect,useState } from "react";
Chart.register(...registerables);

function BarChart() {
    const [users,setUser]=useState([])
  
    fetch("https://localhost:5001/Selidba/GodisnjiIzvestaj", 
    {method:"PUT",
    headers: {"Content-Type":"application/json"},
  }).then(r=>{
    if(r.ok){
      console.log("Uspesan update!");
    }
  })

    useEffect(()=>{
      fetch("https://localhost:5001/Selidba/PreuzmiGodisnjiIzvestaj").then((result)=>{
        result.json().then((resp)=>{
          setUser(resp)
          console.log(resp);
        })
      })
    },[])
    return (
      
      <div className="bar">
        <h1 style={{textAlign:"center"}}><i class="bi bi-clipboard-data"></i> Preliminarni pregled zaposlenja timova u tekućoj godini</h1>
        <div style={{ margin:"0 auto"}} className="barChart">
        <Bar data={{
      labels:["Januar", "Ferbuar","Mart", "April","Maj","Jun","Jul","Avgust","Septembar","Oktobar","Novembar","Decembar"],
      datasets:[{
          label:users.slice(0,1).map(x=>x.naziv),
          data: users.slice(0,12).map(x=>x.brojSelidbi),
          backgroundColor:'rgba(206,105,208,0.7)',
          borderColor:'rgba(206,105,208,1)',
          
      },
  {
      label:users.slice(12,13).map(x=>x.naziv),
      data:users.slice(12,24).map(x=>x.brojSelidbi),
      backgroundColor:'rgba(215,217,108,0.7)',
      borderColor:'rgba(215,217,108,1)',
      
  },
  {
      label:users.slice(34,35).map(x=>x.naziv),
      data:users.slice(24,36).map(x=>x.brojSelidbi),
      backgroundColor:'rgba(1, 4, 136, 0.7)',
      borderColor:'rgba(1, 4, 136, 1)',
      
  },
  {
      label:users.slice(36,37).map(x=>x.naziv),
      data:users.slice(36,48).map(x=>x.brojSelidbi),
      backgroundColor: 'rgba(152,195,245,0.7)',
      borderColor:'rgba(152,195,245,1)'
  },
  {
      label:users.slice(58,59).map(x=>x.naziv),
      data:users.slice(48,60).map(x=>x.brojSelidbi),
      backgroundColor:'rgba(96,201,135,0.6)',
      borderColor:'rgba(96,201,135,1)'
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
  
  export default BarChart;