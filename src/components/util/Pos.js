
const playerPosToIndex = (postop, posleft) => {
    const topIndex = Math.floor((postop + 25)/50);
    const leftIndex = Math.floor((posleft + 25)/50);

    return {top: topIndex, left: leftIndex}
}


export { playerPosToIndex }