import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import "./Agencija.css"

export default class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch("https://localhost:5001/TimRadnika/PreuzmiTimoveRadnika")
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        var tr="https://localhost:5001/Korisnik/register/radnik?tim="+event.target.Tim.value;
        if(event.target.NoviTim.value.length===0)
        {
            console.log(tr);
            fetch(tr,
            {
              method:"POST",
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify({
                ime:event.target.Ime.value,
                prezime:event.target.Prezime.value,
                userName:event.target.Username.value,
                email:event.target.Email.value,
                password:event.target.Password.value
              })
            }).then(r=>{
                if(r.ok){
                    this.props.onHide();
                }
                else
                {
                  r.json().then(res=>
                    {
                      alert(res.message);
                    })
                }
          });
        }
        else
        {
        fetch("https://localhost:5001/Korisnik/register/radnik?tim="+event.target.NoviTim.value,
        {
          method:"POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({
            ime:event.target.Ime.value,
            prezime:event.target.Prezime.value,
            userName:event.target.Username.value,
            email:event.target.Email.value,
            password:event.target.Password.value
          })
        }).then(r=>{
            if(r.ok){
                this.props.onHide();
            }
            else
            {
              r.json().then(res=>
                {
                  alert(res.message);
                })
            }
          });
        }
    }


    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Employee/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
        },
        (error)=>{
            alert('Failed');
        })
        
    }

    render(){
        const {deps}=this.state;
        return (
            <div className="container">

<Modal
{...this.props}
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <i class="bi bi-plus-circle"></i> Dodaj radnika za selidbe
        </Modal.Title>
    </Modal.Header>
    <Modal.Body style={{height:"100%"}} className="dodajRadnika">

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group style={{marginTop:"10px"}} controlId="Ime">
                        <Form.Label>Ime radnika</Form.Label>
                        <Form.Control type="text" name="Ime" required 
                        placeholder="Ime radnika"/>
                    </Form.Group>

                    <Form.Group style={{marginTop:"10px"}} controlId="Prezime">
                        <Form.Label>Prezime radnika</Form.Label>
                        <Form.Control type="text" name="Prezime" required 
                        placeholder="Prezime radnika"/>
                    </Form.Group>

                    <Form.Group style={{marginTop:"10px"}} controlId="Username">
                        <Form.Label><i class="bi bi-person"></i> Username radnika</Form.Label>
                        <Form.Control type="text" name="Username" required 
                        placeholder="UserName radnika"/>
                    </Form.Group>

                    <Form.Group style={{marginTop:"10px"}} controlId="Email">
                        <Form.Label><i class="bi bi-envelope"></i> Email radnika</Form.Label>
                        <Form.Control type="text" name="Email" required 
                        placeholder="Email radnika"/>
                    </Form.Group>

                    <Form.Group style={{marginTop:"10px"}} controlId="Password">
                        <Form.Label><i class="bi bi-key"></i> Password radnika</Form.Label>
                        <Form.Control type="password" name="Password" required 
                        placeholder="Password radnika"/>
                    </Form.Group>

                    <Form.Group style={{marginTop:"10px"}} controlId="NoviTim">
                        <Form.Label> <i class="bi bi-plus-circle"></i> Dodajte radnika u novi tim</Form.Label>
                        <Form.Control type="text" name="NoviTim"
                        placeholder="Novi tim radnika"/>
                    </Form.Group>

                    <Form.Group style={{marginTop:"10px"}} controlId="Tim">
                        <Form.Label><i class="bi bi-arrow-bar-right"></i> Ili u postojeci tim</Form.Label>
                        <Form.Control as="select" 
                        name="Tim">
                        {deps.map(dep=>
                            <option key={dep.id}>{dep.naziv}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Button style={{marginTop:"20px"}} variant="primary" type="submit">
                           Dodaj radnika
                        </Button>
                    </Form.Group>
                </Form>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Zatvori</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}