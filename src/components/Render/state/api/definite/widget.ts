import APIManager from '../index';
import { NewSuccess } from '../response';
import { engine } from '../../engine';
import store from '../../../../../redux';
import { setNextWidget } from '../../../../../redux/actions/widget';

export default function init(api:APIManager) {
    api.registerAPICallBack("SetNextAddWidgetsType",function (data:any) {
        const { nextWidgets } = data;
        store.dispatch(setNextWidget(nextWidgets));
        return NewSuccess(null);
    });
}