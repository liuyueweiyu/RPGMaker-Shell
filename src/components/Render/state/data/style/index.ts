import { Color } from './color';
export interface Style {
    backgound:Color,
    borderSize ?: {
        right : number,
        left : number,
        top : number,
        bottom : number
    },
    borderColor: Color
}