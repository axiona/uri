import {TemplateParameter} from '@alirya/string/function/template';
import {TruncateParameters} from '@alirya/string/truncate';
import Value from "@alirya/value/value";
import Validatable from "@alirya/validatable/validatable";

const templateValid = TemplateParameter({
  string : '{subject} is valid query.'
});
const templateInvalid = TemplateParameter({
  string : '{subject} is not valid query, actual "{actual}".'
});

export function QueryParameters(
  value : string,
  valid : boolean,
  subject : string = ''
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


export function QueryParameter(
    {
        value,
        valid,
        subject,
    } : Value<string> & Validatable<boolean> & {
        subject: string,
    }
) : string {

  return QueryParameters(value, valid, subject)

}


namespace Query {
    export const Parameters = QueryParameters;
    export const Parameter = QueryParameter;
}
export default Query;
