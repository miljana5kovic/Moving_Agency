import React,{Component} from 'react';
import { Navbar } from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class FAQ extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <section id="faq" className="faq section-bg">
            <div className="container">
              <div className="section-title" data-aos="fade-up">
                <h2>Pitanja</h2>
                <p>Često postavljana pitanja</p>
              </div>
              <div className="faq-list">
                <ul>
                  <li data-aos="fade-up">
                    <i className="bx bx-help-circle icon-help" /> <a data-bs-toggle="collapse" className="collapse" data-bs-target="#faq-list-1">Da li radite vikendom? <i className="bx bx-chevron-down icon-show" /><i className="bx bx-chevron-up icon-close" /></a>
                    <div id="faq-list-1" className="collapse" data-bs-parent=".faq-list">
                      <p>
                        Naravno da radimo. Dani vikenda su u stvari najčešće traženi dani za selidbu. Ljudi žele da se presele u vreme kada nemaju obaveza prema  firmi u kojoj su zaposleni, a to su obično dani vikenda. Takođe, radimo i praznicima
                      </p>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-delay={100}>
                    <i className="bx bx-help-circle icon-help" /> <a data-bs-toggle="collapse" data-bs-target="#faq-list-2" className="collapsed">Koliko košta selidba? <i className="bx bx-chevron-down icon-show" /><i className="bx bx-chevron-up icon-close" /></a>
                    <div id="faq-list-2" className="collapse" data-bs-parent=".faq-list">
                      <p>
                        Svaka selidba ima svoju cenu. To znači da ne postoji univerzalna cena za sve selidbe. Možete se prijaviti na našoj aplikaciji i zakazati termin pregleda Vašeg prostora u cilju generisanja cene potencijalne selidbe. Procena je besplatna!
                      </p>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-delay={200}>
                    <i className="bx bx-help-circle icon-help" /> <a data-bs-toggle="collapse" data-bs-target="#faq-list-3" className="collapsed">Da li imate ljude za demontažu nameštaja? <i className="bx bx-chevron-down icon-show" /><i className="bx bx-chevron-up icon-close" /></a>
                    <div id="faq-list-3" className="collapse" data-bs-parent=".faq-list">
                      <p>
                        Naravno da imamo. Naša agencija ima iskusne i spremne ljude na terenu za svaku situaciju. Skoro na svakoj selidbi postoji potreba za rasklapanjem i sklapanjem barem jednog komada nameštaja. Montaža i demontaža nameštaja predstavlja najosetljiviji i najodgovorniji deo svake selidbe.
                      </p>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-delay={300}>
                    <i className="bx bx-help-circle icon-help" /> <a data-bs-toggle="collapse" data-bs-target="#faq-list-4" className="collapsed">Da li zaštićujete nameštaj pri selidbi? <i className="bx bx-chevron-down icon-show" /><i className="bx bx-chevron-up icon-close" /></a>
                    <div id="faq-list-4" className="collapse" data-bs-parent=".faq-list">
                      <p>
                        Sve po potrebi i dogovoru. Neki ljudi jednostavno ne žele da zaštićuju svoj nameštaj. Zaštita nameštaja je poželjna i nikada nije na odmet. Ako se odlučite za delimičnu zaštitu nameštaja, radnici agencije My MSA će zaštititi samo one stvari za koje Vi budete naglasili. Takođe, možete se opredeliti i za varijantu kompletne zaštite nameštaja. Tu podrazumevamo kompletnu zaštitu svih velikih i malih elemenata koji se sele.
                      </p>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-delay={400}>
                    <i className="bx bx-help-circle icon-help" /> <a data-bs-toggle="collapse" data-bs-target="#faq-list-5" className="collapsed">Da li vršite međugraske selidbe? <i className="bx bx-chevron-down icon-show" /><i className="bx bx-chevron-up icon-close" /></a>
                    <div id="faq-list-5" className="collapse" data-bs-parent=".faq-list">
                      <p>
                        Naravno.
                      </p>
                    </div>
                  </li>
                  <li data-aos="fade-up" data-aos-delay={500}>
                    <i className="bx bx-help-circle icon-help" /> <a data-bs-toggle="collapse" data-bs-target="#faq-list-6" className="collapsed">Da li vršite selidbe u inostranstvu? <i className="bx bx-chevron-down icon-show" /><i className="bx bx-chevron-up icon-close" /></a>
                    <div id="faq-list-6" className="collapse" data-bs-parent=".faq-list">
                      <p>
                        Za sada ne. Naša agencija za sada radi samo selidbe u okviru naše države. Količina posla koju odradimo  u našoj zemlji zadovoljava kapacitete koje posedujemo. U bliskoj budućnosti ćemo početi da radimo i u inostranstvu, ali za sada smo fokusirani samo na Srbiju.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )
    }
}export default FAQ;