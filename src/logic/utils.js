export function getRandArray(list) {
    return list.at( (Math.floor( Math.random() * list.length )) );
}

export function getRandDict(list) {
    return list[ getRandArray(Object.keys(list)) ];
}

export async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}