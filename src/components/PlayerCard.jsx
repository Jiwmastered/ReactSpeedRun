import { useContext, useState } from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import '../index.css'
import { ITEMS } from '../api/ItemData'
import { SKILLS } from '../api/SkillData'

export default function PlayerCard(props) {
    const [currentPlayer, setCurrentPlayer] = useState(props.name);
    const {player, setPlayer} = useContext(PlayerContext);

    return (
        <div className='box' style={{maxHeight:"500px"}}>
            <div className='list' style={{width:"250px"}}>
                <img src={props.img} style={{flexGrow:"1"}} alt="" />
                <button onClick={()=>{
                    setPlayer(currentPlayer);
                }}>{(player===currentPlayer) ? "Using" : "Use"}</button>
            </div>
            <div className="box noMargin">
                <div className='list'>
                    <h2>{props.info.name}</h2>
                    <p>{props.info.desc}</p>
                    <h3>Stats</h3>
                    <ul>
                        <li>HP : {props.info.stat.hp}</li>
                        <li>Attack : {props.info.stat.atk}</li>
                        <li>Accuracy : {props.info.stat.acc} %</li>
                    </ul>
                    <h3>Skills</h3>
                    <ul>
                        {props.info.skill.map((v, id)=>{
                            const val = SKILLS[v];
                            return (<>
                                <b>{val.name} [{val.type}ing]</b>
                                <ul>
                                    <li>{val.type} power : {val.power}</li>
                                    <li>cost : {val.cost}</li>
                                </ul>
                            </>);
                        }
                        )}
                    </ul>
                    <h3>Items</h3>
                    <ul>
                        {props.info.item.map((v, id)=>{
                            const val = ITEMS[v];
                            return (<>
                                <b>{val.name} [{val.type}ing]</b>
                                <ul>
                                    <li>{val.type} power : {val.power}</li>
                                </ul>
                            </>);
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}