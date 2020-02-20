import initTest from './test';
import APIManager from '../index';
import initMap from './map';
export function initDefine(api:APIManager) {
    initTest(api);   
    initMap(api);    
}