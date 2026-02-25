import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import { CHARACTERS } from "../api/characters";
import { StatContext } from "../contexts/StatContext";

import { playerPos, obstructs, presets, spawn, updateAll, init, update, canvasSize } from '../logic/gameLogic'
import { CANVAS } from "../api/config";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function toX(x) {
    return x + canvasSize.width/2;
}

function toY(y) {
    return y + canvasSize.height/2;
}

const keys = {};
let phaseDenounce = false;
let jumpDenounce = false;
let hitDenounce = false;
let hitTimer = 1;
let maxObstructTimer = 1;
let obstructTimer = maxObstructTimer;

function keyHandler() {
    // console.log(e);
    if (keys['Space'] && !jumpDenounce) {
        jumpDenounce = true
        playerPos.vy = -4;
    }
    if (!keys['Space'] && jumpDenounce) {
        jumpDenounce = false;
    }

    if (keys['KeyA']) {
        playerPos.vx = -2;
    } else if (keys['KeyD']) {
        playerPos.vx = 2;
    } else {
        playerPos.vx = 0;
    }
}

function GameStage() {
    const [cvWidth, setCvWidth] = useState(CANVAS.WIDTH);
    const {player} = useContext(PlayerContext);
    const {stat, setStat} = useContext(StatContext);
    const canvasRef = useRef(null);
    const imgRef = useRef(new Image());
    const playerDat = CHARACTERS[player];

    useEffect(() => {
        const handleKeyDown = (e) => {
            // console.log(e);
            keys[e.code] = true;
        };

        const handleKeyUp = (e) => {
            // console.log(e);
            keys[e.code] = false;
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    useEffect(()=>{
        if (!player || !stat) return;
        console.log("Begin Canvas")

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let animationId, gameController;
        function loop() { //Cal pos
            // console.log(stat.phase);
            if (stat.player.hp <= 0) return;

            if (!hitDenounce) {
                hitTimer -= 0.01;
                if (hitTimer <= 0) {
                    hitTimer = 1;
                    hitDenounce = true;
                }
            }
            if (obstructTimer > 0) {
                obstructTimer -= 0.01;
            } else {
                obstructTimer = maxObstructTimer;
            }
            // Update Canvas
            const cdx = (canvasSize.width - canvas.width) / 2;
            canvas.width += cdx;
            console.log(canvas.width);
            canvas.height = canvasSize.height;


            // Player Position & Controller
            keyHandler();
            playerPos.y += playerPos.vy;
            playerPos.y = Math.max(Math.min(playerPos.y, canvasSize.height - 25), 25);
            if (playerPos.y == canvasSize.height - 25 && playerPos.vy != 0) {
                playerPos.vy = 0;
            } else {
                playerPos.vy += 0.2;
            }
            playerPos.x = Math.max(Math.min(playerPos.x + playerPos.vx, canvasSize.width - 25), 25);

            
            // [Draw]
            // DRAW PLAYER
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
            ctx.drawImage(imgRef.current, playerPos.x - 25, playerPos.y - 25, 50, 50);
            
            // OBSTRUCTS
            // [Spawn]
            // call preset, if that preset timer isnt dead dont called it 
            if (obstructTimer == maxObstructTimer) {
                if (stat.phase == 1) {
                    presets.topBottom();
                } else if (stat.phase == 2) {
                    presets.diagonal();
                    async () => {
                        await sleep(1000);
                        presets.allCorner();
                    }
                } else if (stat.phase == 4) {
                    presets.pillar(2);
                    async () => {
                        await sleep(1000)
                        console.log("spawn bottom")
                        presets.topBottom();
                    }
                }
            }
            if (stat.phase == 2) {
                canvasSize.width = 1000;
            } else {
                canvasSize.width = CANVAS.WIDTH;
            }
            setCvWidth(canvasSize.width);

            updateAll();

            // [Draw]
            obstructs.forEach(e => {
                ctx.beginPath();
                // console.log(e.x, e.y);
                ctx.arc(e.x, e.y, 25, 0, Math.PI * 2); // x, y, radius, startAngle, endAngle
                if (e.t === 'red') {
                    ctx.fillStyle = "red";
                } else {
                    ctx.fillStyle = "white";
                }
                ctx.fill();
                if (playerPos.x - 25 < e.x + 25 &&
                    playerPos.x + 25 > e.x - 25 &&
                    playerPos.y - 25 < e.y + 25 &&
                    playerPos.y + 25 > e.y - 25) {
                        if (hitDenounce) {
                            hitDenounce = false
                            const newPlayerDat = stat.player
                            newPlayerDat.hp -= 5;
                            setStat((prev)=>({...prev, player: newPlayerDat }))
                        }
                    } // Hit
            });

            
            animationId = requestAnimationFrame(loop);
        }
        loop();
        return () => {
            cancelAnimationFrame(animationId);
        }
    }, [player, stat]);

    useEffect(()=>{
        imgRef.current.src = playerDat.img;
    }, [player])

    return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <canvas 
                className="box" 
                style={{width:`${cvWidth}px`, height:"250px", transition:"width 0.3s ease"}} 
                ref={canvasRef}
            />
        </div>
    )
}

export default GameStage;