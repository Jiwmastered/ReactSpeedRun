import { useContext, useEffect, useState } from "react"
import { StatContext } from "../contexts/StatContext.jsx"
import { PlayerContext } from "../contexts/PlayerContext.jsx";

import { BOSSES } from "../api/bosses";

import '../index.css'

export default function HealthBar(props) {
    const [bossName, setBossName] = useState();
    const [playerName, setPlayerName] = useState();
    const [maxHp, setMaxHp] = useState(0);
    const [hp, setHp] = useState(0);
    const {stat} = useContext(StatContext);
    const {player} = useContext(PlayerContext);

    useEffect(()=>{
        if (!stat) return;
        const bossKey = stat.boss.key;
        console.log(stat)
        if (props.type === 'player') {
            setHp(stat.player.hp);
            setMaxHp(stat.player.maxHp);
            setPlayerName(stat.player.name);
        } else {
            setHp(stat.boss.hp);
            setMaxHp(BOSSES[bossKey].stat.hp);
            setBossName(stat.boss.name);
        }
    }, [player, stat, hp, maxHp]);

    return (
        <>
        <div style={{justifyContent:"center", display:"flex", width:"100%"}}>
            {props.type === 'player' ? (<h3>{playerName}</h3>) : (<h1>{bossName}</h1>)}
        </div>
        <div className="box">
            {/* {console.log(hp, maxHp)} */}
            <div className='hpBar' style={{width:`${ hp / (maxHp) * 100}%`, backgroundColor:(props.type === 'player' ? "red" : "orange"), transition:"width 0.3s ease"}}>{hp}/{maxHp}</div>
        </div>
        </>
    )
}