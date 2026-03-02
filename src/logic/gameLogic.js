import { CANVAS } from "../api/config";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Global



export const obstructs = [];
export const presetRunning = [];

export const canvasSize = {
    width : CANVAS.WIDTH,
    height : CANVAS.HEIGHT
}

export let playerPos = {
    x: canvasSize.width/2,
    y: canvasSize.height/2,
    vx: 0,
    vy: 0
}

export const presets = {
    allCorner : () => {
        const timer = {t:10}
        spawn(1, 25, -25, 0, 2, 'white');
        spawn(1, canvasSize.width - 25, canvasSize.height + 25, 0, -2, 'white');
        spawn(1, -40, canvasSize.height - 25, 2, 0, 'white');
        spawn(2, -40, 25, 3, 0, 'white');
        return timer;
    },
    topBottom : () => {
        const timer = {t:10}
        spawn(1, -40, canvasSize.height - 25, 2, 0, 'red');
        spawn(2, -40, 25, 3, 0, 'red');
        return timer;
    },
    diagonal : () => {
        const timer = {t:10}
        spawn(5, -25, -25, 3, 3, 'red');
        return timer;
    },
    pillar : ( s ) => {
        const timer = {t:10}
        spawn(1, -40, canvasSize.height - 25, s, 0, 'white');
        spawn(1, -40, canvasSize.height - 35, s, 0, 'white');
        spawn(1, -40, canvasSize.height - 45, s, 0, 'white');
        return timer;
    }
    
}

export async function spawn(n, x, y, vx, vy, t) {
    for (let i = 0; i<n; i++) {
        obstructs.push( init(x, y, vx, vy, t));
        await sleep(1000);
    }
}

export function updateAll() {
    obstructs.forEach( (e)=>{
        // console.log(e.x, e.y)
        update(e);
    } );
}

export function init(x, y, vx, vy, tp) {
    const t = {};
    t.x = x;
    t.y = y;
    t.vx = vx;
    t.vy = vy;
    t.t = tp;
    return t;
}

export function update(t) {
    if (t.x <= -50 || t.x >= canvasSize.width + 50 || t.y <= -50 || t.y >= canvasSize.height + 50) {
        // console.log("destroy ", t);
        const index = obstructs.indexOf(t);
        if (index !== -1) {
            obstructs.splice(index, 1);
        }
        return;
    }
    // console.log(t.x, t.y);
    t.x += t.vx;
    t.y += t.vy;

}