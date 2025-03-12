import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export default class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    handleSubmit(event){
        event.preventDefault();
        fetch("https://localhost:5001/Korisnik/register/vlasnik",
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
                window.location.reload(false);
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
        return (
            <div className="container">

<Modal
{...this.props}
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <i class="bi bi-plus-circle"></i> Dodaj vlasnika agencije
        </Modal.Title>
    </Modal.Header>
    <Modal.Body style={{height:"100%"}} >

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="Ime">
                        <Form.Label>Ime vlasnika</Form.Label>
                        <Form.Control type="text" name="Ime" required 
                        placeholder="Ime vlasnika"/>
                    </Form.Group>

                    <Form.Group style={{marginTop:"10px"}} controlId="Prezime">
                        <Form.Label>Prezime vlasnika</Form.Label>
                        <Form.Control type="text" name="Prezime" required 
                        placeholder="Prezime vlasnika"/>
                    </Form.Group>

                    <Form.Group style={{marginTop:"10px"}} controlId="Username">
                        <Form.Label><i class="bi bi-person"></i> Username vlasnika</Form.Label>
                        <Form.Control type="text" name="Username" required 
                        placeholder="Username vlasnika"/>
                    </Form.Group>

                    <Form.Group style={{marginTop:"10px"}} controlId="Email">
                        <Form.Label><i class="bi bi-envelope"></i> Email vlasnika</Form.Label>
                        <Form.Control type="text" name="Email" required 
                        placeholder="Email vlasnika"/>
                    </Form.Group>

                    <Form.Group style={{marginTop:"10px"}} controlId="Password">
                        <Form.Label><i class="bi bi-key"></i> Password vlasnika</Form.Label>
                        <Form.Control type="password" name="Password" required 
                        placeholder="Password vlasnika"/>
                    </Form.Group>

                    <Form.Group>
                        <Button style={{marginTop:"20px"}} variant="primary" type="submit">
                            Dodaj vlasnika 
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