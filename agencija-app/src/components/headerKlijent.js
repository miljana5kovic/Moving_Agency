import React,{Component} from 'react';
import { Navbar,Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Link } from 'react-router-dom';

class HeaderKlijent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
                
          <Navbar id="header" expand="lg" fixed="top">  
         <Navbar.Brand id="brand" href="/"><img
          alt=""
          src="assets/img/logo1.png"
          width="60"
          height="60"
          style={{marginRight:"5px"}}
          className="d-inline-block align-top"
        />{' '} My Moving and Storage Agency</Navbar.Brand>
          <Navbar.Toggle className="text-white m-3" aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse aria-controls="basic-navbar-nav">
              <Nav className=" ms-auto">
                  <Nav.Link  className="d-inline p-2 text-white nav-link scrollto active" href="/klijent#home">
                      Home
                  </Nav.Link>
                  <Nav.Link href="/klijent#about" className="d-inline p-2 text-white nav-link scrollto" >
                      O nama
                  </Nav.Link>
                  <Nav.Link  className="d-inline p-2 text-white nav-link scrollto"  href="/klijent#features">
                      Usluge
                  </Nav.Link>
                  <Nav.Link  className="d-inline p-2 text-white nav-link scrollto"  href="/klijent#gallery">
                      Galerija
                  </Nav.Link>
                  <Nav.Link  className="d-inline p-2 text-white nav-link scrollto"  href="/klijent#team" >
                      Tim
                  </Nav.Link>
                  <Nav.Link  className="d-inline p-2 text-white nav-link scrollto"  href="/klijent#contact">
                      Kontakt
                  </Nav.Link>
                  <Nav.Link className="dropdown d-inline p-2 text-white">
                     <span> Procene </span>
                     <i class="bi bi-chevron-right"></i>
                     <ul>
                        <li>
                            <Link to = "/zakaziPregled">
                                <button class = "dropdown-item" type ="button">
                                    Zakaži procenu
                                </button>
                            </Link>

                        </li>
                        <li>
                        <Link to = "/pregledi">
                                <button class = "dropdown-item" type ="button">
                                    Lista procena
                                </button>
                            </Link>
                        </li>
                     </ul>
                  </Nav.Link>
                  <Nav.Link className="dropdown d-inline p-2 text-white">
                     <span> Selidbe </span>
                     <i class="bi bi-chevron-right"></i>
                     <ul>
                        <li>
                            <Link to = "/selidbe">
                                <button class = "dropdown-item" type ="button">
                                    Aktivne selidbe
                                </button>
                            </Link>

                        </li>
                        <li>
                        <Link to = "/zavrseneSelidbe">
                                <button class = "dropdown-item" type ="button">
                                    Završene selidbe
                                </button>
                            </Link>
                        </li>
                     </ul>
                  </Nav.Link>

                  <Nav.Link className="dugme text-white"  href="/recenzije">
                      Recenzije
                  </Nav.Link>
                  <Nav.Link href="/logout" className="signin text-white" to="/" >
                     LogOut
                  </Nav.Link>
              </Nav>
          </Navbar.Collapse>
      </Navbar>)

    }
}export default HeaderKlijent;