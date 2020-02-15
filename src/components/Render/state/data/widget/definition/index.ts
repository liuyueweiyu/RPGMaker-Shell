import ground from './ground';

interface ImgStandard {
    x : number,
    y : number,
    type : string,
    state : string
}

export interface ImgFileStandard {
    src : string;
    column : number;
    row : number;
    imgs : Array<ImgStandard>;
}

export default [
    ground
]