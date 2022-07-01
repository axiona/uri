import {TemplateParameter} from '@alirya/string/function/template';
import {TruncateParameters} from '@alirya/string/truncate';
import Value from "@alirya/value/value";
import Validatable from "@alirya/validatable/validatable";

const templateValid = TemplateParameter({
    string : '{subject} is valid scheme.'
});
const templateInvalid = TemplateParameter({
    string : '{subject} is not valid scheme, actual "{actual}".'
});

export function SchemeParameters(
  value : string,
  valid : boolean,
  subject : string = 'value'
) : string {

    if(valid) {

        return templateValid({
            subject
        });

    } else {

        return templateInvalid({
            subject,
            actual : TruncateParameters(value, 10)
        });
    }
}


export function SchemeParameter(
    {
        value,
        valid,
        subject = 'value',
    } : Value<string> & Validatable<boolean> & {
        subject ?: string,
    }
) : string {

  return SchemeParameters(value, valid, subject)

}


namespace Scheme {
    export const Parameters = SchemeParameters;
    export const Parameter = SchemeParameter;
}
export default Scheme;
