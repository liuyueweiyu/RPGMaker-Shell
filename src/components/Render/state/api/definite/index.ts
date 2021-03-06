import initTest from './test';
import APIManager from '../index';
import initMap from './map';
import initMode from './mode';
import initWidget from './widget';
export function initDefine(api:APIManager) {
    initTest(api);   
    initMap(api);
    initWidget(api);    
    initMode(api);
}