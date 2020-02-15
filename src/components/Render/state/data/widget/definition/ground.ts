import { ImgFileStandard } from './index';

const GroundFile: ImgFileStandard = {
    src : require( '../../image/tilesets/Dungeon_A1.png'),
    column : 16,
    row : 12,
    imgs : [{
        x : 0,
        y : 0,
        type: 'grass',
        state : 'normal'
    }]
}

export default GroundFile;