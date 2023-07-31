import bstyles from '../../style/Button.module.css';
import lstyles from '../../style/Login.module.css';
import React, { useState } from 'react';
import {socket} from '../util/socket';

function RoomList({ rooms }) {

}

function CreateRoom({ roomLength }) {
    const [making, setMaking] = useState(false);

    const goMakeForm = () => {
        setMaking(true);
    }

    return (
        <>
            {making || roomLength >= 1 ? null : <h2 style={{ fontFamily: "'Courier New', Courier, mono", }}>There has no room yet!</h2>}
            {making ? <MakeRoomform /> : <div
                className={bstyles.btn}
                style={{
                    textAlign: 'center',
                }}
                onClick={goMakeForm}
            >
                Create Room
            </div>}
        </>
    )
}

const MakeRoomform = () => {
    console.log(socket);
    const [room, setRoom] = useState('');
    const createRoom = () => {
        if (room !== "") {
            socket.emit('createRoom', {
                room: room
            });
        }
    }

    return (
        <div className={lstyles.loginBox}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
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

export { RoomList, CreateRoom }