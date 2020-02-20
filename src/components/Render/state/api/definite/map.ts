import APIManager from '../index';
import { NewSuccess } from '../response';
import { engine } from '../../engine';
import { MapFile } from '../../../../Project/file';

export default function init(api:APIManager) {
    api.registerAPICallBack("CreateMapFile",function (data:any) {
        const { row , column } = data;
        const [nodes, nodesPos] = engine.map.createMap(row,column);
        console.log(nodes)
        return NewSuccess({
            nodes,
            nodesPos
        });
    });
    api.registerAPICallBack("OpenFile",function (data:any) {
        const { mapFile } = data
        const mf : MapFile = mapFile as MapFile;
        engine.map.openFile(mf);
        return NewSuccess(null)
    })
}