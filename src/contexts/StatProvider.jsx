import { StatContext } from "./StatContext"
import { useState } from "react"

export function StatProvider({children}) {
    const [stat, setStat] = useState(null);

    return (
    <StatContext.Provider value={{stat, setStat}}>
        {children}
    </StatContext.Provider>
    )
}