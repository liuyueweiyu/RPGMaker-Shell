import APIManager from '../index';
import { NewSuccess } from '../response';
import { engine } from '../../engine';

export default function init(api:APIManager) {
    api.registerAPICallBack("SetGlobalMode",function (data:any) {
        const { mode } = data;
        engine.mode.setGlobalMode(mode)
        return NewSuccess(null);
    });
}