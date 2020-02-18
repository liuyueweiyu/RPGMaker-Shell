import APIManager from '../index';
import { NewSuccess } from '../response';

export default function init(api:APIManager) {
    api.registerAPICallBack("CreateMapFile",function (data:any) {
        const { row , column } = data;
        
    })
}