import React from 'react';

function Blank(){ // # 0: Empty Square
    return (
        <div style={{
            border: "1px solid black",
            backgroundColor: "white",
            width: "50px",
            height: "50px",
            margin: "0px",
        }}>
        </div>
    )
}

function Obstacle(){ // # 1: Obstacle - immovable
    return (
        <div style={{
            border: "1px solid black",
            backgroundColor: "green",
            width: "50px",
            height: "50px",
            margin: "0px",
        }}>
        </div>
    )
}

function Box(){ // # 2: Box - movable
    return (
        <div style={{
            border: "1px solid black",
            backgroundColor: "rgb(186, 124, 60)",
            width: "50px",
            height: "50px",
            display: "inline-block",   
            margin: "0px",
        }}>
        </div>
    )
}

export {Blank, Obstacle, Box}
