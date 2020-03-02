import { ImgFileStandard } from './index';

const GroundFile: ImgFileStandard = {
    src : require( '../../image/tilesets/Dungeon_A1.png'),
    column : 16,
    row : 12,
    imgs : [{
        x : 0,
        y : 0,
        name: 'pool-1-normal-1',
    },{
        x : 1,
        y : 0,
        name: 'pool-1-normal-2',
    },{
        x : 0,
        y : 1,
        name: 'pool-1-normal-3',
    },{
        x : 1,
        y : 1,
        name: 'pool-1-normal-4',
    },{
        x : 0,
        y : 2,
        name: 'pool-1-normal-5',
    },{
        x : 1,
        y : 2,
        name: 'pool-1-normal-6',
    },{
        x : 6,
        y : 0,
        name: 'grass-1-normal-1',
    },{
        x : 7,
        y : 0,
        name: 'grass-1-normal-2',
    },{
        x : 6,
        y : 1,
        name: 'grass-1-normal-3',
    },{
        x : 7,
        y : 1,
        name: 'grass-1-normal-4',
    },{
        x : 6,
        y : 2,
        name: 'grass-1-normal-5',
    },{
        x : 7,
        y : 2,
        name: 'grass-1-normal-6',
    }]
}

export default GroundFile;