import {useState, useContext} from 'react'
import { PlayerContext } from '../contexts/PlayerContext.jsx'

export function PlayerProvider({children}) {
    const [player, setPlayer] = useState(null);
    
    return (
        <PlayerContext.Provider value={{player, setPlayer}}>
            {children}
        </PlayerContext.Provider>
    )
}