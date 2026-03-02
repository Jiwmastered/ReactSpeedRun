import { useContext, useState } from "react";
import { PageContext } from "./PageContext";

export function PageProvider({children}) {
    const [page, setPage] = useState('menu');
    return (
        <PageContext.Provider value={{page, setPage}}>
            {children}
        </PageContext.Provider>
    )
}