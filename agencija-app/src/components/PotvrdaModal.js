import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
export default class PotvrdaModal extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const prihvati = () => {
                const chatMessage = {
                    message: "PRIHVACENO",
                    rec: this.props.primaoc,
                    send: this.props.posiljaoc,
                    tip: "radnik"
                };
            
                try {
                       fetch('https://localhost:5001/Selidba/Obavesti/'+chatMessage.rec+"/"+chatMessage.message+"/"+chatMessage.send+"/"+chatMessage.tip, { 
                        method: 'POST', 
                        body: JSON.stringify(chatMessage),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                }
                catch(e) {
                    console.log('Sending message failed.', e);
                }
                this.props.onHide();
            }
        
            const odbi = () =>
            {
                const chatMessage = {
                    message: "ODBIJENO",
                    rec: this.props.primaoc,
                    send: this.props.posiljaoc,
                    tip: "radnik"
                };
            
                try {
                       fetch('https://localhost:5001/Selidba/Obavesti/'+chatMessage.rec+"/"+chatMessage.message+"/"+chatMessage.send+"/"+chatMessage.tip, { 
                        method: 'POST', 
                        body: JSON.stringify(chatMessage),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                }
                catch(e) {
                    console.log('Sending message failed.', e);
                }
                this.props.onHide();
            }

return (
<div className="container">

<Modal
{...this.props}
size="sm"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Da li ste saglasni sa zakazivanjem selidbe?
        </Modal.Title>
    </Modal.Header>
    <Modal.Body style={{height:"200px"}}>

        <h6 style={{marginBottom:"20px"}}>Cena selidbe je {this.props.cena}din</h6>

        <Button variant="success"onClick={prihvati} style={{marginBotton:"10px", width:"100%"}}>Slazem se</Button>
        <Button variant="danger" onClick={odbi} style={{marginTop:"10px",width:"100%"}}>Odbijam</Button>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Zatvori</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}