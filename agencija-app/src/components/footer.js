import React,{Component} from 'react';

class Footer extends Component{
    render(){
        return(
          <footer id="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="footer-info">
                    <h3>My MSA</h3>
                    <h5 style={{color: '#17b57d'}}>My Moving and Storage Agency</h5>
                    <p className="pb-3"><em>Ukoliko imate potrebe za dodatnim pitanjima, kontaktirajte nas na neki od sledećih načina:</em></p>
                    <p>
                      Aleksandra Medvedeva 14<br />
                      <br />Niš, Srbija<br />
                      <strong>Telefon:</strong> 018/529-105<br />
                      <strong>Email:</strong>mymsa@moving.com<br />
                    </p>
                    <div className="social-links mt-3">
                      <a href="#hero" className="twitter"><i className="bx bxl-twitter" /></a>
                      <a href="#hero" className="facebook"><i className="bx bxl-facebook" /></a>
                      <a href="#hero" className="instagram"><i className="bx bxl-instagram" /></a>
                      <a href="#hero" className="google-plus"><i className="bx bxl-skype" /></a>
                      <a href="#hero" className="linkedin"><i className="bx bxl-linkedin" /></a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6 footer-links">
                  <h4>Korisni linkovi</h4>
                  <ul>
                    <li><i className="bx bx-chevron-right" /> <a href="#hero">Početna</a></li>
                    <li><i className="bx bx-chevron-right" /> <a href="#about">O nama</a></li>
                    <li><i className="bx bx-chevron-right" /> <a href="#features">Usluge</a></li>
                    <li><i className="bx bx-chevron-right" /> <a href="#gallery">Galerija</a></li>
                    <li><i className="bx bx-chevron-right" /> <a href="#team">Tim</a></li>
                    <li><i className="bx bx-chevron-right" /> <a href="#pricing">Moja selidba</a></li>
                  </ul>
                </div>
                <div className="col-lg-2 col-md-6 footer-links">
                  <h4>Naše usluge</h4>
                  <ul>
                    <li><i className="bx bx-chevron-right" /> <a href="#features">Kombi/kamion selidbe i prevoz</a></li>
                    <li><i className="bx bx-chevron-right" /> <a href="#features">Najam radnika za utovar-istovar</a></li>
                    <li><i className="bx bx-chevron-right" /> <a href="#features">Zaštita nameštaja</a></li>
                    <li><i className="bx bx-chevron-right" /> <a href="#features">Demontaža-montaža, priprema i pakovanje</a></li>
                    <li><i className="bx bx-chevron-right" /> <a href="#features">Selidba doma i poslovnog prostora</a></li>
                    <li><i className="bx bx-chevron-right" /> <a href="#features">Besplatna procena selidbe</a></li>
                  </ul>
                </div>
                <div className="col-lg-2 col-md-6 footer-links">
                  <ul>
                    <h4 />
                    <li><i className="bx bx-chevron-right" /> <a href="#features">Dostupnost usluga aplikacije 24/7</a></li>
                    <li><i className="bx bx-chevron-right" /> <a href="#features">Unapred planiranje troškova</a></li>
                    <li><i className="bx bx-chevron-right" /> <a href="#features">Otvoreni smo za sva Vaša pitanja</a></li>
                    <li><i className="bx bx-chevron-right" /> <a href="#features">Selidba za jedan dan</a></li>
                    <li><i className="bx bx-chevron-right" /> <a href="#features">Selidbe svih mesta u Srbiji</a></li>
                    <li><i className="bx bx-chevron-right" /> <a href="#features">365 dana u godini Vama na usluzi</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="copyright">
              © Copyright <strong><span>My MSA</span></strong>. All Rights Reserved
            </div>
            <div className="credits">
              {/* All the links in the footer should remain intact. */}
              {/* You can delete the links only if you purchased the pro version. */}
              {/* Licensing information: https://bootstrapmade.com/license/ */}
              {/* Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/bootslander-free-bootstrap-landing-page-template/ */}
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
            </div>
          </div>
        </footer>
        )
    }
}export default Footer;