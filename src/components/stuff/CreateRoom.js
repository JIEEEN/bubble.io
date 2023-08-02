import bstyles from '../../style/Button.module.css';
import lstyles from '../../style/Login.module.css';
import React, { useState } from 'react';
import {socket} from './Room';
import { useNavigate } from 'react-router-dom';


function CreateRoom() {
    const [room, setRoom] = useState('');
    const navigate = useNavigate();

    const createRoom = () => {
        if (room !== "") {
            socket.emit('createRoom', {
                room: room,
            });
        }
        navigate('/room/list');
    };

    return (
        <div className={lstyles.loginBox}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                top: '50%',
                width: 400,
                height: 300,
            }}>
            <div>
                <input className={lstyles.idBox} placeholder="Room Name"
                    onChange={(e) => setRoom(e.target.value)} />
            </div>
            <button className={bstyles.btn} style={{
                top: 175,
                left: "10%"
            }}
                onClick={createRoom}
            >Create</button>
        </div>
    )
}

export default CreateRoom;