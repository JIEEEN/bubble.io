import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MakeRoomform from './CreateRoom';
import {Socket, io} from 'socket.io-client';
import bstyles from '../../style/Button.module.css';

// const socket = io("http://34.64.54.128:8080/events", {transports: ["websocket"]});
export const socket = io("http://127.0.0.1:8080/events", { transports: ["websocket"] });

function Room() {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('roomList', (roomList) => {
            setRooms(roomList);
        });

        socket.emit('getRoomList', (roomList) => setRooms(roomList));

        return () => {
            socket.off('roomList');
        }
    }, []);


    return (
        <>
            {rooms.length > 0 ? <RoomList rooms={rooms} /> :
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    flexDirection: 'column',
                }}
                >
                    {rooms.length >= 1 ? null : <h2 style={{ fontFamily: "'Courier New', Courier, mono", }}>There has no room yet!</h2>}
                    <div
                        className={bstyles.btn}
                        style={{
                            textAlign: 'center',
                        }}
                        onClick={() => navigate('/room/create')}
                    >
                        Create Room
                    </div>
                </div>
            }
        </>
    )
}

function RoomList({ rooms }) {
    return (
        <>
            {rooms.map((room, index) => {
                return (
                    <li key={index}>{room}</li>
                )
            })
        }
        </>
    );
}


export default Room;