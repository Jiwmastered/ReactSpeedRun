import { createContext, useContext, useEffect, useState } from "react";
import { PlayerContext } from "../contexts/PlayerContext.jsx";
import { StatContext } from "../contexts/StatContext.jsx"

import { CHARACTERS } from '../api/characters.js'
import { BOSSES } from "../api/bosses.js";

import HealthBar from "../components/HealthBar"
import ActionBar from "../components/ActionBar"
import GameStage from "../components/GameStage"
import TextAlert from "../components/TextAlert";
import { getDialogue, randomDialog } from "../logic/dialogue.jsx";



export const gameStateContext = createContext();

export default function BossFightPage() {
    // -------------------------------[[MAIN GAME CONTROLLER]]------------------------------- //

    const [gameState, setGameState] = useState(0);
    const {player} = useContext(PlayerContext);
    const {stat, setStat} = useContext(StatContext);
    
    const [dialogUS, setDialog] = useState({
        title : "",
        message : "",
        options : {
            
        }
    })

    // Initialize stat
    

    // Main game loop
    useEffect(()=>{
        if (gameState == 0) { // Decide
            // use gameAction manager, start game session
            gameAction.start();
            
        } else if (gameState == 1) { // Fight
            // use gameScene manager, start game session
            gameScene.start();

        } else if (gameState == 2) { // Talk
            // use dialogue manager, start dialog session
            dialogManager.start();

        } else if (gameState == -1) { // End
            // show dialog, on close -> get back to char select page
            dialogManager.showSingle();

        }
    }, [gameState])


// ---------------------------------------------------->> OLD CODE <<---------------------------------------------//

    useEffect(()=>{
        if (gameState == 0) { // Initialize
            const keys = Object.keys(BOSSES);
            const bossKey = keys[Math.floor(Math.random() * keys.length)];
            const boss = BOSSES[bossKey];
            const playerData = CHARACTERS[player];
            
            setGameState(2);
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
                    item : (prev) => ([...prev, playerData.item])
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
        } else if (gameState == 2) { // Decide State
            
            if (stat.gameState == "FIGHT") {
                setGameState(1);
            }
        } else if (gameState == 3) { // Talk State
            const bossData = BOSSES[stat.boss.key];
            console.log(bossData.dialog.talk)
            const talks = bossData.dialog.talk;
            const successTalk = randomDialog(bossData.dialog.success);
            const failTalk = randomDialog(bossData.dialog.fail);
            
            const {dialog, options} = getDialogue(talks, 
                ()=>{
                    const rewards = dialog.onCorrect;
                    const {rewardType, value} = randomDialog(rewards);

                    setDialog((prev)=>({...prev, message: successTalk, options:[]}))
                    console.log("success");
                    async () => {
                        await sleep(500);
                        
                        if (rewardType == "item") {
                            setDialog((prev)=>({...prev, message: `I shall give you ${value}`, options:[]}));
                            
                        }

                        await sleep(500);
                    }
                }, 
                ()=>{
                    setDialog((prev)=>({...prev, message: failTalk, options:[]}))
                    console.log("fail", dialogUS);
                })
            
            console.log("decide")

            setDialog({title: stat.boss.name, message: dialog.message, options: options})


            if (stat.gameState == "FIGHT") {
                setGameState(1);
            }
        } else if (gameState == 9) { // Game Over
            
        }
    }, [gameState, player, setStat])

    return (
        <gameStateContext.Provider value={{gameState, setGameState}}>
        <div className="list pd" style={{marginTop:"50px"}}>
            <TextAlert title={dialogUS.title} message={dialogUS.message} options={dialogUS.options}/>
            <HealthBar type="boss"/>
            <GameStage />
            <HealthBar type="player"/>
            <ActionBar />
        </div>
        </gameStateContext.Provider>
    );
}
