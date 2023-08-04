import bstyles from '../../style/Button.module.css';
import lstyles from '../../style/Login.module.css';
import React, { useState } from 'react';
import {socket} from './Room';
import { useNavigate } from 'react-router-dom';


function CreateRoom() {
    const [room, setRoom] = useState('');
    const [roompwd, setRoomPwd] = useState('');
    const navigate = useNavigate();

    const createRoom = () => {
        if (room !== "") {
            socket.emit('createRoom', {
                room: room,
                roompwd: roompwd,
            });
            console.log(room, roompwd)
        }
        // navigate('/room/list');
        navigate('/game');
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
                    <br></br>
                    <br></br>
                <input className={lstyles.idBox} placeholder="Room Password"
                    onChange={(e) => setRoomPwd(e.target.value)} />
            </div>
            <button className={bstyles.btn} style={{
                top: 105,
                left: "10%"
            }}
                onClick={createRoom}
            >Create</button>
        </div>
    )
}

export default CreateRoom;