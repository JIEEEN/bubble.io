import {useState, useEffect, useRef} from 'react';
import { playerPosToIndex } from '../util/Pos.js';

function Player({board}) {
    const savedCallback = useRef();
    const [postop, setPosTop] = useState(0);
    const [posleft, setPosLeft] = useState(0);
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

    const callback = () => {
        if(isup && checkWall(0, postop, posleft, board)){
            setPosTop(postop - 2);
        }
        else if(isdown && checkWall(1, postop, posleft, board)){
            setPosTop(postop + 2);
        }
        else if(isleft && checkWall(2, postop, posleft, board)){
            setPosLeft(posleft - 2);
        }
        else if(isright && checkWall(3, postop, posleft, board)){
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
        <div style={{
            border: "1px solid black",
            borderRadius: "50%",
            backgroundColor: "skyblue",
            width: "47px",
            height: "47px",
            display: "inline-block",   
            top: postop,
            left: posleft,
            margin: "0px",
            position: "absolute",
            zIndex: 1,
        }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        >
        </div>
    )
}

const checkWall = (dir, postop, posleft, board) => {
    switch(dir){
        case 0: //up
            const playerPosUpIndex = playerPosToIndex(postop-30, posleft);
            if (postop <= 1 || (playerPosUpIndex.top >= 1 && board[playerPosUpIndex.top][playerPosUpIndex.left] != 0))
                return false;
            else return true;
            break;
        case 1: //down
            const playerPosDownIndex = playerPosToIndex(postop+24, posleft);
            if (postop >= 601 || (playerPosDownIndex.top <= 11 && board[playerPosDownIndex.top][playerPosDownIndex.left] != 0))
                return false;
            else return true;
            break;
        case 2: //left
            const playerPosLeftIndex = playerPosToIndex(postop, posleft-30);
            if (posleft <= 1 || (playerPosLeftIndex.left >= 1 && board[playerPosLeftIndex.top][playerPosLeftIndex.left] != 0)){
                return false;}
            else return true;
            break;
        case 3: //right
            const playerPosRightIndex = playerPosToIndex(postop, posleft+24);
            if (posleft >= 729 || (playerPosRightIndex.left <= 13 && board[playerPosRightIndex.top][playerPosRightIndex.left] != 0))
                return false;
            else return true;
            break;
    }
}

export default Player;