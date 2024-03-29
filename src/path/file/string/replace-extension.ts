import Escape from '@axiona/string/pattern/escape.js';

export function ReplaceExtensionParameters(
    path : string,
    extension : string,
    delimiter  = ':/\\'
) : string {

    if(extension.length) {

        extension = '.' + extension;
    }

    const escaped = Escape(delimiter);

    // determine if replaced or not, in case file without extension
    // replace operation will not work
    let replaced  = false;

    path = path.replace(new RegExp(`\\.[^${escaped}.]+$`), (substring, args) => {

        replaced = true;
        return extension;
    });

    if(replaced) {

        return path;
    }

    // bare file
    if(path.match(new RegExp(`[^${escaped}]+$`))) {

        return path + extension;
    }

    return path;
}




export interface ReplaceNameArgument {
    path : string;
    extension : string;
    delimiter ?: string;
}

export function ReplaceExtensionParameter(
  {
        path,
        extension,
        delimiter = ':/\\'
    } : ReplaceNameArgument
) : string {

    return ReplaceExtensionParameters(path, extension, delimiter);
}




namespace ReplaceExtension {
    export const Parameters = ReplaceExtensionParameters;
    export const Parameter = ReplaceExtensionParameter;
    export type Argument = ReplaceNameArgument;
}
export default ReplaceExtension;
