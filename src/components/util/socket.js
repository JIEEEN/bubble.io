import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { RoomList, CreateRoom } from '../stuff/Room';

// const socket = io("http://34.64.54.128:8080/events", {transports: ["websocket"]});
export const socket = io("http://127.0.0.1:8080/events", { transports: ["websocket"] });

function Client() {

    const [rooms, setRooms] = useState([]);


    return (
        <>
            {rooms.length > 0 ? <RoomList rooms={rooms}/> :
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    flexDirection: 'column',
                }}>
                    <CreateRoom roomLength={rooms.length}/>
                </div>
            }
        </>
    )
}


export default Client;