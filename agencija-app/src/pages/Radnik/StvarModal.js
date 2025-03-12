import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
export default class SobaModal extends Component{
    constructor(props){
        super(props);
        this.state={tip:[], podTip:[],jedinica:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }


    handleSubmit(event){
        event.preventDefault();
        var id=localStorage.getItem('idSoba');
       fetch("https://localhost:5001/Selidba/NovaStvar/"+id+"/"+event.target.Jedinica.value+"/"+event.target.PodTip.value+"/"+parseInt(event.target.Kolicina.value)+"/"+parseFloat(event.target.Dubina.value)+"/"+parseFloat(event.target.Sirina.value)+"/"+parseFloat(event.target.Visina.value),{method: "PUT",headers: {"Content-Type":"application/json"}})
       .then(response=>response.json())
        .then(data=>{
            this.props.onHide();
        });
    }

    componentDidMount()
    {
        fetch("https://localhost:5001/TipStvari/PreuzmiTipoveStvari")
        .then(response=>response.json())
        .then(data=>{
            this.setState({tip:data});
        });

        fetch("https://localhost:5001/Jedinica/PreuzmiJedinice")
        .then(response=>response.json())
        .then(data=>{
            this.setState({jedinica:data});
        });
        fetch("https://localhost:5001/PodtipStvari/PreuzmiPodtipoveZaRandomTip/")
        .then(response=>response.json())
        .then(data=>{
            this.setState({podTip:data});
        });
    }
    podTipLista(id){
        fetch("https://localhost:5001/PodtipStvari/PreuzmiPodtipoveZaTip/"+id)
        .then(response=>response.json())
        .then(data=>{
            this.setState({podTip:data});
        });
    }

    render(){
        const {tip}=this.state;
        const {podTip}=this.state;
        const {jedinica}=this.state;
        return (
            <div className="container">

<Modal
{...this.props}
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <i class="bi bi-plus-circle"></i> Dodaj objekat
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

                <Form onSubmit={this.handleSubmit}>
                    
                <Form.Group controlId="Tip">
                        <Form.Label>Tip</Form.Label>
                        <Form.Control as="select" 
                        name="Tip"
                        onChange={(e)=>this.podTipLista(e.target.value)}>
                        {tip.map(dep=>
                            <option  key={dep.id} value={dep.id}>{dep.naziv}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="PodTip">
                        <Form.Label>Podtip</Form.Label>
                        <Form.Control as="select" 
                        name="PodTip">
                        {podTip.map(dep=>
                            <option key={dep.id} value={dep.id}>{dep.naziv}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Kolicina">
                        <Form.Label>Količina</Form.Label>
                        <Form.Control type="number" min="0" name="Kolicina" required 
                        placeholder="Kolicina"/>
                    </Form.Group>

                <div style={{display:'flex'}}>
                    <Form.Group controlId="Visina">
                        <Form.Label>Visina</Form.Label>
                        <Form.Control type="number" min="0" name="Visina" step="0.1" required 
                        placeholder="Visina"/>
                    </Form.Group>
                    <Form.Group controlId="Sirina">
                        <Form.Label>Širina</Form.Label>
                        <Form.Control type="number" min="0" name="Sirina" step="0.1" required 
                        placeholder="Sirina"/>
                    </Form.Group>
                    <Form.Group controlId="Dubina">
                        <Form.Label>Dubina</Form.Label>
                        <Form.Control type="number" min="0" name="Dubina" step="0.1" required 
                        placeholder="Dubina"/>
                    </Form.Group>
                </div>

                <Form.Group controlId="Jedinica">
                        <Form.Label>Jedinica</Form.Label>
                        <Form.Control as="select" 
                        name="Jedinica">
                        {jedinica.map(dep=>
                            <option key={dep.id} value={dep.id}>{dep.naziv}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Button style={{marginTop:"20px"}} variant="primary" type="submit">
                         Dodaj artikal
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