import APIManager from '../index';
import { NewSuccess } from '../response';
import { engine } from '../../engine';
import store from '../../../../../redux';
import Node from '../../data/node';

export default function init(api:APIManager) {
    api.registerAPICallBack("test",function (data:any) {
        return NewSuccess(null)
    })
    api.registerAPICallBack("TestAddWidget",function (data:any) {
        const activeNodes = store.getState().activeNodes as Array<Array<Node>>;
        const nextWidgetTypes = store.getState().nextWidgets as Array<Array<string>>;
        const res = engine.widgets.addWidget(nextWidgetTypes,activeNodes);
        return NewSuccess(res)
    })
}