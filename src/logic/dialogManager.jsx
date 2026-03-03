import React from "react";
import TextAlert from "../components/TextAlert";

export default class dialogManager extends React.Component {
    constructor(params) {
        this._state = 0; // 0=idle, -1=died, 1=alive
    }

    render() { // Root is a screen
        return <> 
            
        </>
    }

    start() {
        if (this._state == 1) return;
        
        // ( show dialog, wait for input ) -> has escape
        
    }
    
    kill() {
        
    }
}