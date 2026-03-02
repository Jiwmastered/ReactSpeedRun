import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../contexts/PlayerContext.jsx";
import { StatContext } from "../contexts/StatContext.jsx"

import { CHARACTERS } from '../api/characters.js'
import { BOSSES } from "../api/bosses.js";

import HealthBar from "../components/HealthBar"
import ActionBar from "../components/ActionBar"
import GameStage from "../components/GameStage"
import TextAlert from "../components/TextAlert";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function BossFightPage() {
    const [gameState, setGameState] = useState(0);
    const {player} = useContext(PlayerContext);
    const {stat, setStat} = useContext(StatContext);

    useEffect(()=>{
        if (gameState == 0) { // Initialize
            const keys = Object.keys(BOSSES);
            const bossKey = keys[Math.floor(Math.random() * keys.length)];
            const boss = BOSSES[bossKey];
            const playerData = CHARACTERS[player];
            
            setGameState(1);
            setStat((prev)=>({...prev,
                state : "DECIDE",
                phase : 0,
                player : {
                    name : playerData.name,
                    hp : playerData.stat.hp,
                    sp : 20,
                    maxHp : playerData.stat.hp,
                    atk : playerData.stat.atk,
                    acc : playerData.stat.acc,
                    debuff : 0,
                    item : playerData.item
                },
                boss : {
                    key : bossKey,
                    name : boss.name,
                    hp : boss.stat.hp,
                    acc : boss.stat.acc,
                    debuff : 0,
                    spokenDialog : [] // index
                }
            }));
        } else if (gameState == 1) { // Fight Loop
            async function gameLoop() {
                await sleep(1500);
                setStat((prev)=>({...prev, phase: 1}));            
                
                await sleep(10000);
                setStat((prev)=>({...prev, phase: 2}));
                
                await sleep(10000);
                setStat((prev)=>({...prev, phase: 3}));

                await sleep(10000);
                setStat((prev)=>({...prev, phase: 4}));
                
                await sleep(10000);
                setStat((prev)=>({...prev, phase: 0}));

                if (stat.player.hp > 0) {
                    setStat((prev)=>({...prev, state: "DECIDE"}))
                    setGameState(2);
                }
            }
            gameLoop();
        } else if (gameState == 2) {
            if (stat.gameState == "FIGHT") {
                setGameState(1);
            }
        }
    }, [gameState, player, setStat])


    return (
        <div className="list pd" style={{marginTop:"50px"}}>
            {/* <TextAlert /> */}
            <HealthBar type="boss"/>
            <GameStage />
            <HealthBar type="player"/>
            <ActionBar />
        </div>
    );
}
