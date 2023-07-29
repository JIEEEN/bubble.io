import React, { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export const socket = io("http://34.64.54.128");
export default function Client(){
    function useEffectHandler(){
        console.log(socket);
    }
    useEffect(useEffectHandler, []);

    return (
        <div>
            <h1>Socket.io</h1>
        </div>
    )
}