import { randomBetween } from "../math";

export function getNewID() : number {
    return +new Date()  + randomBetween(0,+new Date());
}