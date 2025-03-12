
import './App.css';
import home from './pages/home';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/home';
import HomeKlijent from './pages/Klijent/homeKlijent';
import ZakaziPregled from './pages/Klijent/zakaziPregled';
import Pregledi from './pages/Klijent/pregledi';
import Selidbe from './pages/Klijent/selidbe';
import ZavrseneSelidbe from './pages/Klijent/zavrseneSelidbe';
import Recenzije from './pages/Klijent/recenzije';
import RecenzijeSelidba from './pages/Klijent/recenzijeSelidba';
import React,{ useEffect,useState } from "react";
import {Navigate } from 'react-router-dom'


import HomeAdmin from './pages/Admin/homeAdmin';
import DodajVlasnikaAgencije from './pages/Admin/dodajVlasnikaAgencije';

import HomeVlasnik from './pages/Vlasnik/homeVlasnik';
import Statistika from './pages/Vlasnik/statistika';
import DodajAdministraciju from './pages/Vlasnik/dodajAdministraciju';



import HomeAgencija from './pages/Agencija/homeAgencija';
import DodajRadnika from './pages/Agencija/dodajRadnika';
import Procene from './pages/Agencija/procene';
import ZakazaneProcene from './pages/Agencija/zakazaneProcene';
import PregledRecenzija from './pages/Agencija/pregledRecenzija';

import HomeRadnik from './pages/Radnik/homeRadnik'
import ListaZadataka from './pages/Radnik/listaZadataka';
import ZakaziSelidbu from './pages/Radnik/zakaziSelidbu';

import Login from './pages/login';
import Register from './pages/register';
import Logout from './pages/logout';


import Notification from './components/Notification'


<Route exact path="/" element={<home />}/>

function App() {
  const [user,setUser]=useState("neregistrovan")
  useEffect(()=>{
    fetch("https://localhost:5001/Korisnik/korisnik", 
         {
             mode:'cors',method:"GET",
             headers: {"Content-Type":"application/json"},
             credentials: "include"
           })
     .then
     (
     pKorisnik=>
     {
         pKorisnik.json()
         .then
         (
             k=>
             {
              console.log(k.tipKorsinika);
                 setUser(k.tipKorsinika);
             }
         )
     })
  },[])
let auth=localStorage.getItem("user");
if(auth==null) 
localStorage.setItem("user", "neregistrovan");
return (
    <div className="Aplikacija">
      <BrowserRouter>
      <Notification/>
      <Routes>
      <Route exact path="/" element={<Home  auth={user} />}/>
        <Route path='/login' element={<Login auth={user}/>} exact/>
        <Route path='/register' element={<Register auth={user}/>} exact/>
        <Route path='/logout' element={<Logout/>} exact/>

        <Route path='/klijent' element={<HomeKlijent auth={user}/>} exact/>
        <Route path='/zakaziPregled' element={<ZakaziPregled auth={user}/>} exact/>
        <Route path='/pregledi' element={<Pregledi auth={user}/>} exact/>
        <Route path='/selidbe' element={<Selidbe auth={user}/>} exact/>
        <Route path='/zavrseneSelidbe' element={<ZavrseneSelidbe auth={user}/>} exact/>
        <Route path = '/recenzije' element = {<Recenzije auth={user}/>} exact/>
        <Route path = '/recenzijeSelidba' element = {<RecenzijeSelidba auth={user}/>} exact/>

        <Route path='/agencija' element={<HomeAgencija auth={user}/>} exact/>
        <Route path='/procene' element={<Procene auth={user}/>} exact/>
        <Route path='/zakazaneProcene' element={<ZakazaneProcene auth={user}/>} exact/>
        <Route path='/dodajRadnika' element={<DodajRadnika auth={user}/>} exact/>
        <Route path='/pregledRecenzija' element={<PregledRecenzija auth={user}/>} exact/>
        
        <Route path='/radnik' element={<HomeRadnik auth={user}/>} exact/>
        <Route path='/listaZadataka' element={<ListaZadataka auth={user}/>} exact/>
        <Route path='/zakaziSelidu' element={<ZakaziSelidbu auth={user}/>} exact/>
        
        <Route path='/vlasnik' element={<HomeVlasnik auth={user}/>} exact/>
        <Route path='/statistika' element={<Statistika auth={user}/>} exact/>
        <Route path='/dodajAdministraciju' element={<DodajAdministraciju auth={user}/>} exact/>
       
        

        <Route path='/admin' element={<HomeAdmin/>} exact/>
        <Route path='/dodajVlasnikaAgencije' element={<DodajVlasnikaAgencije/>} exact/>

      </Routes>
    </BrowserRouter>
      </div>
);
} export default App;
