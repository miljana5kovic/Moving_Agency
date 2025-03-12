import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import PotvrdaModal from "./PotvrdaModal"
import SelidbaModal from "../pages/Radnik/SelidbaModal"
import {Navigate } from 'react-router-dom'

const obavestiMe = async (idPosiljaoca,idPrimaoca,poruka) => {
    const chatMessage = {
        message: poruka,
        rec: idPrimaoca,
        send: idPosiljaoca,
        tip: "radnik"
    };

    try {
        await  fetch('https://localhost:5001/Selidba/Obavesti/'+chatMessage.rec+"/"+chatMessage.message+"/"+chatMessage.send+"/"+chatMessage.tip, { 
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
}
const Notification = () => {
    const [ModalShow, setShow] = useState(false);
    const [ModalSelidbaShow, setShowSelidba] = useState(false);
    let ModalClose=()=>setShow(false);
    let ModalSelidbaClose=()=>setShowSelidba(false);

    const [ connection, setConnection ] = useState("");
    const [ cena, setCena ] = useState("");
    const [ id1, setId1 ] = useState("");
    const [ id2, setId2 ] = useState("");
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/NotificationHub')
            .withAutomaticReconnect()
            .build();

        connection.start()
            .then(result => {
                var id=localStorage.getItem('userID');
                connection.on('ReceiveMessage', message => {
                    console.log(message.id+" "+id);
                    if(message.id==id)
                    {
                        if(message.tip=="klijent")
                        {
                            setConnection("Cena");
                            setShow(true);
                            setCena(message.poruka);
                            setId1(message.id);
                            setId2(message.idPosiljaoc);
                        }
                        else if(message.tip=="radnik")
                        {
                            if(message.poruka==="PRIHVACENO")
                            {
                                setConnection("DA");
                                
                            setShowSelidba(true);
                            }
                            else if(message.poruka==="ODBIJENO")
                            {
                                setConnection("NE");
                            }
                        } 
                    }
                });
            })
            .catch(e => console.log('Connection failed: ', e));
    }, []);;

    if(connection=="Cena")
    {
       return ( <PotvrdaModal
        show={ModalShow}
        onHide={ModalClose}
        cena={cena}
        posiljaoc={id1}
        primaoc={id2}/>)
    }
    else if(connection=="DA")
    {
        return(<SelidbaModal show={ModalSelidbaShow}
               onHide={ModalSelidbaClose}/>)
    }
    else if(connection=="NE")
    {
        alert("Odbijeno je!");
        var id=localStorage.getItem('idProcene');
       fetch("https://localhost:5001/Selidba/UkloniSelidbu/"+id,{method: "DELETE",headers: {"Content-Type":"application/json"}})
       .then(response=>response.json())
        .then(data=>{
        }
      );
    }
};

export default Notification;