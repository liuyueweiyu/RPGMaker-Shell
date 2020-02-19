export function strToColor(str: string) {
    let n = parseInt(str.substr(1),16);
    const obj = {
        a : 1,
        b : n % 256,
        g : 0,
        r : 0
    }
    n = n >> 8;
    obj.g = n % 256;
    obj.r = (n >> 8) % 256;
    return obj;
}