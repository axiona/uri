import {TemplateParameter} from '@axiona/string/function/template.js';
import {TruncateParameters} from '@axiona/string/truncate.js';
import Value from '@axiona/value/value.js';
import Validatable from '@axiona/validatable/validatable.js';

const templateValid = TemplateParameter({
  string : '{subject} is valid fragment.',
  callback : string=>string.trim()
});
const templateInvalid = TemplateParameter({
  string : '{subject} is not valid fragment, actual "{actual}".',
  callback : string=>string.trim()
});

export function FragmentParameters(
  value : string,
  valid : boolean,
  pattern: RegExp,
  subject  = 'value'
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

export type FragmentArgument = Value<string> & Validatable<boolean> & {
    pattern: RegExp,
    subject?: string
};

export function FragmentParameter(
    {
        value,
        valid,
        subject,
        pattern
    } : FragmentArgument
) : string {

  return FragmentParameters(value, valid, pattern, subject);

}

namespace Fragment {
    export const Parameters = FragmentParameters;
    export type Argument = FragmentArgument;
    export const Parameter = FragmentParameter;
}
export default Fragment;
