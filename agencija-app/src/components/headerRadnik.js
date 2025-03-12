import React,{Component} from 'react';
import { Navbar,Nav} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Link } from 'react-router-dom';

class HeaderRadnik extends Component{
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
                  <Nav.Link href="/radnik#hero" className="d-inline p-2 text-white nav-link scrollto active">
                      Home
                  </Nav.Link>
                  <Nav.Link href="/radnik#about" className="d-inline p-2 text-white nav-link scrollto" >
                      O nama
                  </Nav.Link>
                  <Nav.Link  className="d-inline p-2 text-white nav-link scrollto"  href="/radnik#features">
                      Usluge
                  </Nav.Link>
                  <Nav.Link  className="d-inline p-2 text-white nav-link scrollto"  href="/radnik#gallery">
                      Galerija
                  </Nav.Link>
                  <Nav.Link  className="d-inline p-2 text-white nav-link scrollto"  href="/radnik#team" >
                      Tim
                  </Nav.Link>
                  <Nav.Link  className="d-inline p-2 text-white nav-link scrollto"  href="/radnik#contact">
                      Kontakt
                  </Nav.Link>
                  <Nav.Link className="dugme text-white"  href="/listaZadataka">
                      Lista Radnih Zadataka 
                  </Nav.Link>
                  <Nav.Link href="/logout" className="signin text-white">
                     LogOut
                  </Nav.Link>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
      )
    }
}export default HeaderRadnik;