import TextAlert from "../components/TextAlert"

export let currentBoss

export function randomDialog(dialogues) {
    const index = Math.floor(Math.random * dialogues.length);
    return dialogues.at(index);
}

export function getDialogue(dialogs, onSuccess, onFail) {
    const dialog = randomDialog(dialogs);
    const choices = dialog.choice;
    const correct = dialog.correct;
    const options = {};
    choices.map( (v, i)=> {
        if (correct == i) {
            options[v] = onSuccess;
        } else {
            options[v] = onFail;
        }
    });
    return {dialog, options};
}