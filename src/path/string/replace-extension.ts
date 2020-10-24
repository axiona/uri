import Escape from "@dikac/t-string/pattern/escape";

export default function ReplaceExtension(
    path : string,
    extension : string,
    delimiter : string = ':/\\'
) : string {

    if(extension.length) {

        extension = '.' + extension;
    }

    let escaped = Escape(delimiter);

    // determine if replaced or not, in case file without extension
    // replace operation will not work
    let replaced : boolean = false;

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
