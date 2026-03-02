import Jim from '../assets/bosses/Jim.png'

export const BOSSES = {
    "jimmy" : {
        name : "Jimmy de alacos",
        img : Jim,
        desc : "nah",
        stat : {
            hp : 100,
            atk : 10,
            acc : 20,
        },
        debuff : 0,
        dialog : {
            talk : [
                {
                    message: "Sea or Mountain",
                    choice: ["Sea", "Mountain", "Neither"],
                    correct: 2, // 0 index based,
                    onCorrect: [{
                        rewardType : "item",
                        value : "saka3Souvenir"
                    }]
                },
                {
                    message: "If artchnp was a girl, would you sleep with him",
                    choice: ["yes", "no"],
                    correct: 0, // 0 index based,
                    onCorrect: [{
                        rewardType : "item",
                        value : "artMilk"
                    }]
                },
                {
                    message: "Who has the best head",
                    choice: ["Art", "Kongpop", "Jirawit", "Poom", "Pitipoom", "Pooh", "Petch", "Peak", "Peem", "Ton"],
                    correct: -1, // 0 index based, -1 all wrong, -2 all correct,
                    onCorrect: [{
                        rewardType : "item",
                        value : "artMilk"
                    }],
                    onWrong: {
                        action : "setState",
                        value : "FIGHT"
                    }
                }
            ],
            taunt : [
                "Get good",
                "Nungmoo",
                "I sud lao"
            ],
            random : [

            ]
        }
    }
};