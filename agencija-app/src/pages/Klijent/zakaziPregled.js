
import React, {useState,useEffect} from "react";
import HeaderKlijent from '../../components/headerKlijent';
import DateTimePicker from '@mooncake-dev/react-day-time-picker';
import {Navigate, renderMatches } from 'react-router-dom'
import styled from 'styled-components';
import PlacesAutocomplete, {geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import './Kalendar.css'
import Image from 'react-bootstrap/Image'


const mapStyles = {
  width: '200px',
  height: '200px'
};

const theme = {
    primary: '#1acc8d',
    secondary: '#1acc8d',
    background: '#fff', 
    buttons: {
      disabled: {
        color: '#333',
        background: '#f0f0f0'
      },
      confirm: {
        color: '#1acc8d',
        background: '#0205a1',
        hover: {
          color: '#1acc8d',
          background: 'lightslategrey'
        }
      }
    },
    feedback: {
      success: {
        color: '#0205a1'
      },
      failed: {
        color: '#0205a1'
      }
    }
  };

  const Container = styled.div`
  width: 1200px;
  margin: 1em auto;
  margin-top:100px;
  padding:1em;
  background-color: #fff;
  color: #0205a1;
  border: 3px solid #f0f0f0;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 4px #00000018;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

 var ZakaziPregled=()=>{
  const [address, setAddress] = React.useState("");
  const [lat, setLat] = React.useState("");
  const [lng, setLng] = React.useState("");
  const [vreme, setVreme] = useState("");
  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleErr, setScheduleErr] = useState('');
  const [redP, setRedirect] = useState(false);
  const [ok, setOk]=useState(true);
  const [proslo, setProslo]=useState(false);
  const [niz,setNiz]=useState([])
  const handleChange = (value) => {
    setAddress(value);
  }

  useEffect(() => {      
  fetch("https://localhost:5001/Pregled/VratiZauzete",{method:"GET"})
  .then
  (
  pKorisnik=>
  {
  pKorisnik.json()
  .then
  (
    pregled=>
    {
        setNiz(pregled.map(a=>a.datum));
    }
  )
}) });

  const handleSelect = (value) => {
    setAddress(value);
    geocodeByAddress(value)
    .then(results => getLatLng(results[0]))
    .then(({ lat, lng }) =>
      {
        setLat(lat);
        setLng(lng);
      }
    );
  }
function timeSlotValidator(slotTime) {

    const minTime = new Date(
      slotTime.getFullYear(),
      slotTime.getMonth(),
      slotTime.getDate(),
      8,
      0,
      0
    );
    const maxTime = new Date(
      slotTime.getFullYear(),
      slotTime.getMonth(),
      slotTime.getDate(),
      18,
      0,
      0
    );
    var dan=slotTime.getDate().toString().length==1?'0'+slotTime.getDate():slotTime.getDate();
    var mesec=slotTime.getMonth().toString().length==1?'0'+(slotTime.getMonth()+1):(slotTime.getMonth()+1);
    var datum=dan+'.'+mesec+'.'+slotTime.getFullYear()+'.'+slotTime.getHours();
    var ok=(niz.indexOf(datum)<0);
    return slotTime.getTime() > minTime.getTime()&&slotTime.getTime() <maxTime.getTime()&&ok;
  }

    const handleScheduled = dateTime => {
    if(address.length==0) alert('Morate Uneti Adresu!');
    else{
    var dan=dateTime .getDate().toString().length==1?'0'+dateTime .getDate():dateTime .getDate();
    var mesec=dateTime.getMonth().toString().length==1?'0'+(dateTime.getMonth()+1):(dateTime.getMonth()+1);
    var datum=dan+'.'+mesec+'.'+dateTime.getFullYear()+'.';
        var vreme=dateTime.getHours();
        var id=localStorage.getItem('userID');
        if(lng.length==0||lat.length==0) alert('Izaberite Validnu Adresu');
        else
        {if(window.confirm('Da li Ste sigurni da želite da zakazete procenu selidbe? Datuma '+datum+' u '+vreme+'h'))
        {
          fetch("https://localhost:5001/Pregled/ZakaziPreged/"+id+"/"+datum+"/"+vreme+"/"+address+"/"+lng+"/"+lat,
          {
            method:"POST"
          }).then(r=>{
                if(r.ok)
                {
                r.json().then(res=>
                    {
                        setRedirect(true);
                    })
                }
                else
                {
                  if(r.statusText=="Bad Request")
                  alert("Ne možete da zakažete vise od 5 procena!");
                }

            });}}

            
        }
      }
      


  let auth=localStorage.getItem('user');

      if(redP){ 
        return <Navigate to = {"/pregledi"}/>}

        if(auth==="klijent")
        { 
        return(
            <div className="Aplikacija">
            <HeaderKlijent/>
            <Container>
              <h3>Izaberite datum i lokaciju</h3>
              <div className="KalendarLokacija" >
                        
            <DateTimePicker className="CalendarPregled" timeSlotSizeMinutes={60}
                timeSlotValidator={timeSlotValidator}
                onConfirm={handleScheduled}
                isLoading={isScheduling}
                isDone={isScheduled}
                err={scheduleErr}
                theme={theme}/>
            <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
                searchOptions={{  componentRestrictions: { country: ["rs"] } }}>
                {({
                   getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                 }) => (
                  <div>
                  <br/>
                  <Image src="assets/img/lokacija.png" className="d-block mx-auto img-fluid " />
                    <input
                      {...getInputProps({
                      placeholder: "Unesite lokaciju",
                      })}
                      />
                    <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const style = suggestion.active
                    ? { backgroundColor: "#0205a1", cursor: "pointer", color:"#fff"}
                    : { backgroundColor: "#ffffff", cursor: "pointer" };

                  return (
                    <div key={suggestion.placeId} {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        </div>
        </Container>
        </div>
        )}

        else if(auth==="neregistrovan") 
        {
            return <Navigate to = '/login'/>
        }
        else{
            var redirect="/"+auth;
            return <Navigate to = {redirect}/>
        }
}
export default ZakaziPregled;