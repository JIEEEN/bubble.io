import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import bstyles from '../../style/Button.module.css';
import lstyles from '../../style/Login.module.css';

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
                // <OverlayExample /> :
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    flexDirection: 'column',
                }}
                >
                    {rooms.length >= 1 ? null : <h2
                        style={{
                            fontFamily: "'Courier New', Courier, mono",
                            fontSize: 30,
                        }}>There has no room yet!</h2>}
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
            <button onClick={() => navigate('/room/create')}>qwer</button>
        </>
    )
}

function RoomList({ rooms }) {
    const [showOverlay, setShowOverlay] = useState(false);
    const [delroom, setDelRoom] = useState({});

    const handleButtonClick = () => {
        setShowOverlay(true);
    };
    const handleOverlayClose = () => {
        setShowOverlay(false);
    };

    const joinRoom = () => {
        
    };

    return (
        <>
            {rooms.map((room, index) => {
                return (
                    <>
                        <div key={index} className={lstyles.loginBox}
                            style={{
                                textAlign: 'center',
                                position: 'relative',
                                width: 200,
                                height: 100,
                                top: 100,
                                left: '20%',
                                float: 'left',
                                margin: 10,
                            }}>
                            <span style={{ position: 'relative', top: 15, display: 'inline-block', verticalAlign: 'middle',
                            fontFamily: '"Courier New", Courier, monospace'}}>
                                {room.roomNum}
                            </span>
                            <button className={bstyles.btn} style={{
                                width: 75,
                                top: 50,
                                left: "8%",
                                position: 'absolute',
                            }}
                                onClick={joinRoom}
                            >join
                            </button>
                            <button className={bstyles.btn} style={{
                                width: 75,
                                top: 50,
                                left: "55%",
                                position: 'absolute',
                            }}
                                onClick={() => {
                                    handleButtonClick();
                                    setDelRoom(room);
                                }}
                            >delete
                            </button>
                        </div>
                    </>
                )
            })
            }
            {showOverlay && (<div className={lstyles.overlay}>
                <div className={lstyles.loginBox}
                    style={{
                        borderColor: 'rgb(132, 127, 127)',
                        width: 300,
                        height: 200,
                        top: '50%',
                    }}>
                    {<DeleteForm delroom={delroom} setOverlay={setShowOverlay}/>}
                </div>
            </div>)}
        </>
    );
}

function DeleteForm({delroom, setOverlay}) {
    const [password, setPassword] = useState('');
    const [close, setClose] = useState(false);
    const navigate = useNavigate();

    const checkPassword = (password, e) => {
        if (delroom.roomPwd === password){
            socket.emit('deleteRoom', {
                room: delroom,
            });
            setOverlay(false);
        }
    };

    return (
        <>
            <input className={lstyles.idBox} placeholder="Room Password"
                style={{ width: 215 }} 
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className={bstyles.btn} style={{
                width: 190,
                top: 80,
                left: "10%",
                position: 'relative',
            }} onClick={(e) => checkPassword(password, e)}>
                delete</button>
            <button className={bstyles.btn} style={{
                width: 50,
                top: 80,
                left: "10%",
                position: 'relative',
            }} onClick={() => setOverlay(false)}>
                X</button>
        </>
    )
}


export default Room;