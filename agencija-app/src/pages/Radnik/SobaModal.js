import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
export default class SobaModal extends Component{
    constructor(props){
        super(props);
        this.state={tipSobe:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }


    handleSubmit(event){
        event.preventDefault();
        var id=localStorage.getItem('idProcene');
       fetch("https://localhost:5001/Selidba/NovaSoba/"+id+"/"+this.state.tip+"/"+event.target.Oznaka.value,{method: "PUT",headers: {"Content-Type":"application/json"}})
       .then(r=>{
        if(r.ok){
            this.props.onHide();
        }
        else
        {
          r.json().then(res=>
            {
              alert("Nastala je Greska Prilikom Dodavanja Sobe");
            })
        }
      });
    }

    componentDidMount()
    {
        fetch("https://localhost:5001/TipProstorije/PreuzmiTipoveProstorija")
        .then(response=>response.json())
        .then(data=>{
            this.setState({tipSobe:data});
        });
    }

    componentDidUpdate()
    {
        fetch("https://localhost:5001/TipProstorije/PreuzmiTipoveProstorija")
        .then(response=>response.json())
        .then(data=>{
            this.setState({tipSobe:data});
        });
    }

    render(){
        const {tipSobe, tip}=this.state;
        return (
            <div className="container">

<Modal
{...this.props}
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <i class="bi bi-plus-circle"></i> Dodaj sobu
        </Modal.Title>
    </Modal.Header>
    <Modal.Body style={{height:"570px"}}>

                <Form onSubmit={this.handleSubmit}>
                    
                <Form.Group controlId="Tip">
                        <Form.Label><b>Tip</b></Form.Label>
                        <ListGroup as="ul">
            {tipSobe.map(dep=>
            <ListGroup.Item
            key={dep.id}
                as="li"
                className="d-flex align-items-start"
            >
<Form.Check 
                        type="radio"
                        name="group1"
                        label={dep.naziv}
                        value={dep.id}
                        onChange={e =>this.setState({tip:e.currentTarget.value})}
                      />
                  </ListGroup.Item>
    )}
    
</ListGroup>
                    </Form.Group>

                    <Form.Group controlId="Oznaka">
                        <Form.Label><b>Oznaka sobe</b></Form.Label>
                        <Form.Control type="text" name="Naziv" required 
                        placeholder="Oznaka"/>
                    </Form.Group>

                    <Form.Group>
                        <Button style={{marginTop:"20px"}} variant="primary" type="submit">
                        
                        Dodaj sobu
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