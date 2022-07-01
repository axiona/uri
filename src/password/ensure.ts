import {ValidatableParameters, ValidatableParameter} from '@alirya/validator/message/function/validatable';
import {PasswordParameters} from './validatable/password';
import AssertValid from '@alirya/validator/validatable/assert/valid';
import {MatchType as EnsureReturn} from '@alirya/string/validatable/match';
import PasswordMessage from './validatable/string/password';
import Value from "@alirya/value/value";

export function EnsureParameters(
    password : string,
) : EnsureReturn<string, string>;

export function EnsureParameters<MessageT>(
    password : string,
    message: ValidatableParameters<string, MessageT>
) : EnsureReturn<string, MessageT>;

export function EnsureParameters<MessageT>(
    password : string,
    message: ValidatableParameters<string, MessageT|string> = PasswordMessage.Parameters
)  : EnsureReturn<string, string|MessageT> {

    let validatable = PasswordParameters(password, message);

    AssertValid(validatable);

    return  validatable;
}

export {EnsureReturn}


export interface EnsureArgument<MessageType> extends Value<string> {

    message ?: ValidatableParameter<string, MessageType|string>
}

export function EnsureParameter(
    {
        value
    } : Omit<EnsureArgument<string>, 'message'>
) : EnsureReturn<string, string>;

export function EnsureParameter<MessageType>(
    {
        value,
        message,
    } : Required<EnsureArgument<MessageType>>
) : EnsureReturn<string, MessageType>;

export function EnsureParameter<MessageType>(
    {
        value,
        message = PasswordMessage.Parameter,
    } : Required<EnsureArgument<MessageType|string>>

) : EnsureReturn<string, MessageType|string> {

    return EnsureParameters(value, (value, valid) => message({value, valid}));
}



namespace Ensure {
    export const Parameters = EnsureParameters;
    export const Parameter = EnsureParameter;
    export type Return<ValueType extends string, MessageType> = EnsureReturn<ValueType, MessageType>;
    export type Argument<MessageType> = EnsureArgument<MessageType>;
}
export default Ensure;
