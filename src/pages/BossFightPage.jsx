import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../contexts/PlayerContext.jsx";
import { StatContext } from "../contexts/StatContext.jsx"

import { CHARACTERS } from '../api/CharacterData.jsx'

import HealthBar from "../components/HealthBar"
import ActionBar from "../components/ActionBar"
import GameStage from "../components/GameStage"

export default function BossFightPage() {
    const [gameState, setGameState] = useState(0);
    const {player} = useContext(PlayerContext);
    const {stat, setStat} = useContext(StatContext);

    useEffect(()=>{
        if (gameState == 0) {
            setGameState(1);
            setStat({
                gameTurn : "player",
                player : {
                    name : CHARACTERS[player].name,
                    hp : CHARACTERS[player].stat.hp,
                    sp : 20,
                    maxHp : CHARACTERS[player].stat.hp,
                    atk : CHARACTERS[player].stat.atk,
                    acc : CHARACTERS[player].stat.acc,
                    debuff : 0,
                    item : [],
                },
                boss : {
                    name : "Jimmy de alacos",
                    hp : 100,
                    maxHp : 100,
                    atk : 10,
                    acc : 20,
                    debuff : 0
                }
            });
        }
    }, [gameState, player, setStat])


    return (
        <div className="list pd">
            <HealthBar type="boss"/>
            <GameStage />
            <HealthBar type="player"/>
            <ActionBar />
        </div>
    );
} 
