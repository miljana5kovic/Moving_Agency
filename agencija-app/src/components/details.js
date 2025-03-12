import React,{Component} from 'react';
import { Navbar } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Details extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
      <section id="details" className="details">
      <div className="container">
        <div className="row content">
          <div className="col-md-4" data-aos="fade-right">
            <img src="assets/img/details-1.png" className="img-fluid" alt="" />
          </div>
          <div className="col-md-8 pt-4" data-aos="fade-up">
            <h3>Selidba stambenog prostora</h3>
            <p className="fst-italic">
              “Preseliti nekoga ne znači samo preneti stvari sa jednog mesta na drugo. Za našu agenciju to znači spakovati ceo nečiji život i uspomene u kutije i ponovo, na nekom drugom mestu, od njih napraviti dom.”
            </p>
            <ul>
              <li><i className="bi bi-check" /> <span style={{color: '#010246', fontWeight: 'bold'}}>Besplatna procena selidbe</span> - potrebno je da zakažete termin pregleda Vašeg stambenog prostora. Nas radnik dolazi na Vašu adresu u tačno ugovorenom terminu,
                procenjuje koliko stvari imate i tada saznajete cenu Vaše selidbe</li>
              <li><i className="bi bi-check" /> <span style={{color: '#010246', fontWeight: 'bold'}}>Zakazivanje termina selidbe</span> - ukoliko Vam odgovara prethodno procenjena cena selidbe, možete izabrati pogodan termin za realizaciju iste. Selidbe su po principu "selidba za dan".</li>
              <li><i className="bi bi-check" /> <span style={{color: '#010246', fontWeight: 'bold'}}>Pakovanje</span> - obezbedjujemo zaštitu stvari koje pažljivo pakujemo</li>
              <li><i className="bi bi-check" /> <span style={{color: '#010246', fontWeight: 'bold'}}>Utovar</span> - nakon pakovanja, Vaše stvari ćemo pažljivo uneti u kombi ili kamion. Sva naša vozila su dodatno tapacirana kako bi pružila veću zaštitu stvarima</li>
              <li><i className="bi bi-check" /> <span style={{color: '#010246', fontWeight: 'bold'}}>Prevoz</span> - Vaše stvari prevešćemo od jedne do druge tačke. Naši profesionalni vozači će se pobrinuti da vaše stvari stignu bezbedno na odredište.</li>
              <li><i className="bi bi-check" /> <span style={{color: '#010246', fontWeight: 'bold'}}>Istovar</span> - sve Vaše stvari postavljamo onako kako vi želite. Nakon što odemo vaš prostor će biti u potpunosti funkcionalan i spreman za život.</li>
            </ul>
          </div>
        </div>
        <div className="row content">
          <div className="col-md-4 order-1 order-md-2" data-aos="fade-left">
            <img src="assets/img/details-4.png" className="img-fluid" alt="" />
          </div>
          <div className="col-md-8 pt-5 order-2 order-md-1" data-aos="fade-up">
            <h3>Selidba poslovnog prostora</h3>
            <p className="fst-italic">
              U selidbe poslovnih prostora ubrajaju se selidbe kancelarija, magacina, skladišta i bilo kog prostora u kome obavljate svoj biznis. Selidbe poslovnih prostora obavljaju se sa posebnom pažnjom.
              Vodićemo računa kako o vašem kancelarijskom nameštaju tako i o svim sitnicama koje obeležavaju vaš posao.
            </p>
            <ul>
              <li><i className="bi bi-check" /> <span style={{color: '#010246', fontWeight: 'bold'}}>Besplatna procena selidbe</span> - potrebno je da zakažete termin pregleda Vašeg poslovnog prostora. Nas radnik dolazi na Vašu adresu u tačno ugovorenom terminu,
                procenjuje koliko stvari imate i tada saznajete cenu Vaše selidbe</li>
              <li><i className="bi bi-check" /> <span style={{color: '#010246', fontWeight: 'bold'}}>Zakazivanje termina selidbe</span> - ukoliko Vam odgovara prethodno procenjena cena selidbe, možete izabrati pogodan termin za realizaciju iste. Selidbe su po principu "selidba za dan".</li>
              <li><i className="bi bi-check" /> <span style={{color: '#010246', fontWeight: 'bold'}}>Pakovanje</span> - obezbedjujemo zaštitu stvari koje pažljivo pakujemo</li>
              <li><i className="bi bi-check" /> <span style={{color: '#010246', fontWeight: 'bold'}}>Utovar</span> - nakon pakovanja, Vaše stvari ćemo pažljivo uneti u kombi ili kamion. Sva naša vozila su dodatno tapacirana kako bi pružila veću zaštitu stvarima</li>
              <li><i className="bi bi-check" /> <span style={{color: '#010246', fontWeight: 'bold'}}>Prevoz</span> - Vaše stvari prevešćemo od jedne do druge tačke. Naši profesionalni vozači će se pobrinuti da vaše stvari stignu bezbedno na odredište.</li>
              <li><i className="bi bi-check" /> <span style={{color: '#010246', fontWeight: 'bold'}}>Istovar</span> - sve vaše stvari postavljamo onako kako vi želite. Nakon što odemo vaš poslovni prostor biće u potpunosti funkcionalan i spreman za rad.</li>
            </ul>
          </div>
        </div>
      </div>
      </section>
        )
    }
} export default Details;