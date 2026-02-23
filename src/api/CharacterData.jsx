import breakingBad from '../assets/players/breakingBad.png'
import artDeer from '../assets/players/artDeer.png'
import glover from '../assets/players/glover.gif'

export const CHARACTERS = {
    "breakingBad": {
        desc: `The situation he found after hours spent with the TV series name Breaking Bad.
        `,
        name: "Brakeing bad", 
        img: breakingBad, 
        stat: {
            hp: 20,
            atk: 10,
            acc: 15
        },
        skill : ["cheerUp", "muscleFlex"],
        item : ["flask"]
    },
    "glover" : {
        desc: "His gloving skill is marvellous.",
        name: "Glover", 
        img: glover, 
        stat: {
            hp: 12,
            atk: 16,
            acc: 30
        },
        skill : [ "deglove", "gloving"],
        item : [ "glove" ]
    },
    "artDeer":{ 
        name: "Art Deer",
        desc: "Shy emo undergrad student. Love interacting with underage boys in Criminality and Build a boat for treasure Game on Roblox. He also had a deep relation with ice factory located not faraway from his home, it was the place where he grown and learn to live.", 
        img: artDeer, 
        stat: {
            hp: 30,
            atk: 5,
            acc: 60
        },
        skill : [ "esanAttack", "rapture", "nonStemBless"],
        item : [ "razorMouse" ]
    }
}