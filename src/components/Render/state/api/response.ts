import { MESSAGE_CODE_SUCCESS } from '../../constant/code';
export interface  ResponseData {
    code : number,
    msg :  string
    data : any
}

export function NewSuccess(data:any):ResponseData{
    return {
        code : MESSAGE_CODE_SUCCESS,
        msg : 'success',
        data
    }
}