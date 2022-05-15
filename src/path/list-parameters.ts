import Path from './path';
import StandardParameters from './standard-parameters';
import SplitParameters from './array/split-parameters';
import Number from "../../../number/dist/boolean/number";

export class ListContainer extends Array<string> implements Path {

    static get [Symbol.species](): ArrayConstructor {
        return Array;
    }

    constructor(
        segments : Iterable<string> = [],
        public separator : string = '/',
        public separators : string = '/\\:',
        public empty : boolean = true,
        public prefix: boolean = false,
        private proxyHandler : ReturnType<typeof ListGetterHandler>
    ) {

        super(...segments);
        this.split();
    }

    get splitter() : string {

        return this.separators + this.separator;
    }

    push(...items : string[]): number {

        /**
         * temporary disable proxy handler, prevent repeat call on {@see ListGetterHandlerType.split} or this[number] = value
         */

        let result = 0;

        this.proxyHandler.unSplitUpdate(()=> {
            result = super.push(...items);
            this.split()
        })

        return result;
    }

    split() {

        const data = SplitParameters(this.toString(), this.splitter, this.empty);

        this.proxyHandler.unSplitUpdate(()=> {

            super.length = data.length;

            for (const [i, value] of data.entries()) {

                super[i] = value;
            }
        })
    }

    toString(): string {

        let standard = new StandardParameters(this.join(this.separator[0]), this.separator[0], this.separators, this.prefix);
        return standard.toString();
    }
}

export type ListGetterHandlerType = ProxyHandler<ListContainer> & {
    split:boolean,
    unSplitUpdate(callbak:()=>void);
};

export function ListGetterHandler() : ListGetterHandlerType{

    return {

        split : true,

        /**
         * temporary disable proxy handler, prevent repeat call on {@see ListGetterHandlerType.split} or this[number] = value
         */
        unSplitUpdate(callbak:()=>void) : void {

            this.split = false;
            callbak();
            this.split = true;
        },

        set(target, p: PropertyKey, value: any, receiver: any): boolean {

            target[p] = value;

            if(this.split && Number(p)) {

                target.split();
            }

            return true;
        }
    }
}


export default function ListParameters(
    segments : Iterable<string> = [],
    separator : string = '/',
    separators : string = '/\\:',
    empty : boolean = true,
    prefix: boolean = false
) : Omit<ListContainer, 'split'> {

    const handler = ListGetterHandler();

    return new Proxy(new ListContainer(segments, separator, separators, empty, prefix, handler), handler);
}