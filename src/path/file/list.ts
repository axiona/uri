import {ListContainer as PathList, ListGetterHandler, ListType as PathListType} from '../list';
import {ExtensionParameters} from './string/extension';
import {ReplaceExtensionParameters} from './string/replace-extension';
import {FileParameters} from './string/file';
import SafeCast from '@alirya/string/safe-cast';
import {ReplaceFileParameters} from './string/replace-file';
import {NameParameters} from './string/name';
import {ReplaceNameParameters} from './string/replace-name';
import {StandardParameters} from './standard';
import {RemoveSuffixParameters} from '@alirya/string/remove-suffix';
import File from './file';

export interface ListType extends PathListType {

    extension : string;
    directory : string;
    file : string;
    name : string;
}

export class ListContainer extends PathList implements File {

    constructor(
        segments : Iterable<string>|string = [],
        separator : string = '/',
        separators : string = '/\\:',
        empty : boolean = true,
        prefix: boolean = false,
        proxyHandler : ReturnType<typeof ListGetterHandler>
    ) {
        super(segments, separator, separators, empty, prefix, proxyHandler);
    }

    get extension () : string {

        let last = this[this.length - 1];

        if(last) {

            return ExtensionParameters(last);
        }

        return '';
    }

    set directory(dir : string)  {

        const datas = [dir, this.file];

        this.splice(0);
        this.push(...datas);
        this.split();
    }

    get directory() : string {

        let standard = new StandardParameters(this.join(this.separator[0]), this.separator, this.separators, this.prefix);
        return RemoveSuffixParameters(standard.directory, this.separator[0]);
    }


    set extension(extension : string)  {

        const index = this.length - 1;
        const last = this[index];

        if(last) {

            this[index] = ReplaceExtensionParameters(last, extension);
        }
    }

    get file () : string  {

        const last = this[this.length - 1];

        if(last) {

            return FileParameters(last, this.splitter);
        }

        return '';
    }

    set file(extension : string)  {

        const index = this.length - 1;
        const last = this[index];

        if(last) {

            this[this.length - 1] = SafeCast(ReplaceFileParameters(last, extension, this.splitter));
        }
    }


    get name () : string {

        const last = this[this.length - 1];

        if(last) {

            return NameParameters(last, this.splitter);
        }

        return '';
    }

    set name(name : string)  {

        const index = this.length - 1;
        const last = this[index];

        if(last) {

            this[index] = SafeCast(ReplaceNameParameters(last, name, this.splitter));
        }
    }
}

export function ListParameters(
    segments : Iterable<string> = [],
    separator : string = '/',
    separators : string = '/\\:',
    empty : boolean = true,
    prefix: boolean = false
) : ListType {

    const handler = ListGetterHandler();

    return new Proxy<ListContainer>(new ListContainer(segments, separator, separators, empty, prefix, handler), handler);
}

export interface ListArgument {
    segments ?: Iterable<string>;
    separator ?: string;
    separators ?: string;
    empty ?: boolean;
    prefix ?: boolean;
}

export function ListParameter(
    {
        segments  = [],
        separator = '/',
        separators = '/\\:',
        empty = true,
        prefix = false,
    } : ListArgument
) : ListType {

    return ListParameters(segments, separator, separators, empty, prefix);
}

namespace List {
    export const Parameters = ListParameters;
    export const Parameter = ListParameter;
    export const Container = ListContainer;
    export type Type = ListType;
    export type Argument = ListArgument;
}
export default List;
