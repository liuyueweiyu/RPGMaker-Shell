import APIManager from '../index';
import { NewSuccess } from '../response';
import { engine } from '../../engine';

export default function init(api:APIManager) {
    api.registerAPICallBack("CreateMapFile",function (data:any) {
        const { row , column } = data;
        engine.map.createMap(row,column);
        return NewSuccess(null);
    })
}