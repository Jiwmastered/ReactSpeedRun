import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";
import { PlayerContext } from "../contexts/PlayerContext";

import { CHARACTERS } from "../api/CharacterData";

import PlayerCard from "../components/PlayerCard";

export default function CharSelector() {
    const {setPage} = useContext(PageContext);
    const {player} = useContext(PlayerContext);

    return (
        <>
        <div className="list" style={{margin: "0px 250px", height:"75vh", overflow:"scroll", scrollbarWidth:"none"}}>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", margin:"50px"}}>
                <h1>Char Selector Page</h1>
            </div>
            <div className="list">
                {Object.entries(CHARACTERS).map(([key, char], id) => 
                    (<PlayerCard key={id} name={key} img={char.img} info={char}/>)
                )}
            </div>    
        </div>
        <div className="box" style={{width:"100%", height:"25vh",flexDirection:"column", justifyContent:"center", alignItems:"center", margin:"0px"}}>
            <h3>{player? `Selecting ${CHARACTERS[player].name}`: "Choose Player"}</h3>
            <button style={{flexGrow:"1", maxHeight:"100px", width:"500px"}} onClick={()=>{
                setPage('boss');
            }    
            } >Fight</button>
        </div>
        </>
    );
}