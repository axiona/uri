import {PadParameters} from '@axiona/string/pad.js';


export default function * PercentEncodedList() {

    for(let i = 0; i<=255; i++) {

        yield '%' + PadParameters(i.toString(16), 2, '0');

    }
}
