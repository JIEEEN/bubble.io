import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { playerPosToIndex } from '../util/Pos.js';
import { socket } from './Room';

class Player {
    constructor(pos_x, pos_y, speed = 2, player_num = 1) {
        this.pos_x = pos_x;
        this.pos_y = pos_y;
        this.speed = speed;
        this.player_num = player_num;
    }
}

function PlayerRender({ board }) {
    const location = useLocation();
    const playernum = location.state.player_num;
    const savedCallback = useRef();
    const [player, setPlayer] = playernum == 1 ? useState(new Player(0, 0, 2, playernum)) : useState(new Player(0, 729, 2, playernum));
    const [enemy, setEnemy] = playernum == 1 ? useState(new Player(0, 729, 2, playernum)) : useState(new Player(0, 0, 2, playernum));
    const [postop, setPosTop] = useState(player.pos_x);
    const [posleft, setPosLeft] = useState(player.pos_y);
    const [isright, setIsRight] = useState(false);
    const [isup, setIsUp] = useState(false);
    const [isleft, setIsLeft] = useState(false);
    const [isdown, setIsDown] = useState(false);


    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    }, []);
    useEffect(() => {
        savedCallback.current = callback;
    });
    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        }

        const timer = setInterval(tick, 10);
        return () => clearInterval(timer);
    }, []);
    useEffect(() => {
        setPlayer(new Player(postop, posleft));
        socket.emit('playerPos', player);
        socket.on('playerPos', (data) => {
            const updateEnemy = new Player(data.pos_x, data.pos_y, enemy.speed, enemy.player_num);
            setEnemy(updateEnemy);
        });
    }, [postop, posleft, socket]);

    const callback = () => {
        if (isup && checkWall(0, postop, posleft, board)) {
            setPosTop(postop - 2);
        }
        else if (isdown && checkWall(1, postop, posleft, board)) {
            setPosTop(postop + 2);
        }
        else if (isleft && checkWall(2, postop, posleft, board)) {
            setPosLeft(posleft - 2);
        }
        else if (isright && checkWall(3, postop, posleft, board)) {
            setPosLeft(posleft + 2);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            setIsUp(true);
            setIsDown(false);
            setIsLeft(false);
            setIsRight(false);
        }
        if (e.key === 'ArrowDown') {
            setIsDown(true);
            setIsLeft(false);
            setIsRight(false);
            setIsUp(false);
        }
        if (e.key === 'ArrowLeft') {
            setIsLeft(true);
            setIsDown(false);
            setIsRight(false);
            setIsUp(false);
        }
        if (e.key === 'ArrowRight') {
            setIsRight(true);
            setIsDown(false);
            setIsLeft(false);
            setIsUp(false);
        }
    }
    const handleKeyUp = (e) => {
        if (e.key === 'ArrowUp') {
            setIsUp(false);
        }
        if (e.key === 'ArrowDown') {
            setIsDown(false);
        }
        if (e.key === 'ArrowLeft') {
            setIsLeft(false);
        }
        if (e.key === 'ArrowRight') {
            setIsRight(false);
        }
    }

    return (
        <>
            <div style={{
                border: "1px solid black",
                borderRadius: "50%",
                backgroundColor: playernum == 1 ? "skyblue" : "red",
                width: "47px",
                height: "47px",
                display: "inline-block",
                top: player.pos_x,
                left: player.pos_y,
                margin: "0px",
                position: "absolute",
                zIndex: 1,
            }}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
            >
            </div>
            <div style={{
                border: "1px solid black",
                borderRadius: "50%",
                backgroundColor: playernum == 1 ? "red" : "skyblue",
                width: "47px",
                height: "47px",
                display: "inline-block",
                top: enemy.pos_x,
                left: enemy.pos_y,
                margin: "0px",
                position: "absolute",
                zIndex: 1,
            }}
            >
            </div>
        </>
    )
}

const checkWall = (dir, postop, posleft, board) => {
    switch (dir) {
        case 0: //up
            const PlayerRenderPosUpIndex = playerPosToIndex(postop - 30, posleft);
            if (postop <= 1 || (PlayerRenderPosUpIndex.top >= 1 && board[PlayerRenderPosUpIndex.top][PlayerRenderPosUpIndex.left] != 0))
                return false;
            else return true;
            break;
        case 1: //down
            const PlayerRenderPosDownIndex = playerPosToIndex(postop + 24, posleft);
            if (postop >= 601 || (PlayerRenderPosDownIndex.top <= 11 && board[PlayerRenderPosDownIndex.top][PlayerRenderPosDownIndex.left] != 0))
                return false;
            else return true;
            break;
        case 2: //left
            const PlayerRenderPosLeftIndex = playerPosToIndex(postop, posleft - 30);
            if (posleft <= 1 || (PlayerRenderPosLeftIndex.left >= 1 && board[PlayerRenderPosLeftIndex.top][PlayerRenderPosLeftIndex.left] != 0)) {
                return false;
            }
            else return true;
            break;
        case 3: //right
            const PlayerRenderPosRightIndex = playerPosToIndex(postop, posleft + 24);
            if (posleft >= 729 || (PlayerRenderPosRightIndex.left <= 13 && board[PlayerRenderPosRightIndex.top][PlayerRenderPosRightIndex.left] != 0))
                return false;
            else return true;
            break;
    }
}

export default PlayerRender;