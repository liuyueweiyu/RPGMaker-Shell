import APIManager from '../index';
import { NewSuccess } from '../response';

export default function init(api:APIManager) {
    api.registerAPICallBack("test",function (data:any) {
        return NewSuccess(null)
    })
}