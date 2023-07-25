import { useState, useMemo } from 'react';
import {Blank, Obstacle, Box} from './stuff/Block';
import Player from './stuff/Player';

function Board(){
    const board1 = [
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    const [board, setBoard] = useState(board1);

    return (
        <div style={{zIndex: "0", position: 'relative', top: "60px", left: "400px", width: "778px", height: "652px"}}>
            <Player board={board1}/>
            {board.map((row, i) => (
                <div key={i} style={{
                    height:"50px",
                    display: "flex", justifyContent: "center"
                    }}>
                    {row.map((col, j) => (
                        <div key={j}>
                            {col === 0 ? <Blank /> : col === 1 ? <Obstacle /> : col === 2 ? <Box /> : null}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}



export default Board;