import {Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import React,{ Component} from "react";
Chart.register(...registerables);

class Dodatak extends Component {

    constructor(props){
      super(props);
      }

  funkcija1(){
    fetch("https://localhost:5001/Selidba/GodisnjiIzvestaj", 
    {method:"PUT",
    headers: {"Content-Type":"application/json"}
  }).then(r=>{
    if(r.ok){
      console.log("Uspesan update!");
    }
  })
}
componentDidMount()
{
    this.funkcija1();
}
componentDidUpdate()
{
    this.funkcija1();
}
  render(){
    return(
        console.log("cao")
    )
  }
}export default Dodatak;