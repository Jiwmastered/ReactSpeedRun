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
            <div className='list cover'>
                <img className="cover" src={props.img}  alt="" />
                <button onClick={()=>{
                    setPlayer(currentPlayer);
                }}>{(player===currentPlayer) ? "Using" : "Use"}</button>
            </div>
            <div className="box noMargin">
                <div className='list'>
                    <h2>{props.info.name}</h2>
                    <p>{props.info.desc}</p>
                    <h3><span className="red">Stats</span></h3>
                    <div style={{display:"flex"}}>
                        <div className="box">HP : {props.info.stat.hp}</div>
                        <div className="box">Attack : {props.info.stat.atk}</div>
                        <div className="box">Accuracy : {props.info.stat.acc} %</div>
                    </div>
                    <h3><span className="blue">Skills</span></h3>
                    <div className="list">
                        {props.info.skill.map((v, id)=>{
                            const val = SKILLS[v];
                            return (<div className="box">
                                <b>{val.name} [{val.type}ing]</b>
                                <ul>
                                    <li>{val.type} power : <b>{val.power}</b></li>
                                    <li>cost : <b>{val.cost}</b></li>
                                </ul>
                            </div>);
                            }
                        )}
                    </div>
                    <h3><span className="green">Items</span></h3>
                    <div className="list" >
                        {props.info.item.map((v, id)=>{
                            const val = ITEMS[v];
                            return (<div className="box">
                                <b>{val.name} [{val.type}ing]</b>
                                <ul>
                                    <li>{val.type} power : <b>{val.power}</b></li>
                                </ul>
                            </div>);
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}