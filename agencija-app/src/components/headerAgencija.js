import React,{Component} from 'react';
import { Navbar,Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Link } from 'react-router-dom';

class HeaderAgencija extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount()
    {
        
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
              <Nav className="ms-auto">
                  <Nav.Link  className="d-inline p-2 text-white nav-link scrollto active" href="/agencija#hero" >
                      Home
                  </Nav.Link>
                  <Nav.Link href="/agencija#about" className="d-inline p-2 text-white nav-link scrollto" to="/agencija">
                      O nama
                  </Nav.Link>
                  <Nav.Link to="/agencija" className="d-inline p-2 text-white nav-link scrollto"  href="/agencija#features">
                      Usluge
                  </Nav.Link>
                  <Nav.Link to="/agencija" className="d-inline p-2 text-white nav-link scrollto"  href="/agencija#gallery">
                      Galerija
                  </Nav.Link>
                  <Nav.Link to="/agencija" className="d-inline p-2 text-white nav-link scrollto"  href="/agencija#team" >
                      Tim
                  </Nav.Link>
                  <Nav.Link to="/agencija" className="d-inline p-2 text-white nav-link scrollto"  href="/agencija#contact">
                      Kontakt
                  </Nav.Link>

                  <Nav.Link className="dropdown d-inline p-2 text-white">
                     <span> Procene </span>
                     <i class="bi bi-chevron-right"></i>
                     <ul>
                        <li>
                            <Link to = "/procene">
                                <button class = "dropdown-item" type ="button">
                                    Lista procena
                                </button>
                            </Link>

                        </li>
                        <li>
                        <Link to = "/zakazaneProcene">
                                <button class = "dropdown-item" type ="button">
                                    Zakazane procene
                                </button>
                            </Link>
                        </li>
                     </ul>
                  </Nav.Link>

                  <Nav.Link className="dugme text-white"  href="/dodajRadnika">
                      Dodaj Radnika
                  </Nav.Link>
                 
                  

                  <Nav.Link className="dugme text-white"  href="/pregledRecenzija">
                      Pregled recenzija
                  </Nav.Link>
                  <Nav.Link href="/logout" className="signin text-white" >
                     LogOut
                  </Nav.Link>
              </Nav>
          </Navbar.Collapse>
      </Navbar>)

    }
}export default HeaderAgencija;