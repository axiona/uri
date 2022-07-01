import {ValidatableParameters, ValidatableParameter} from '@alirya/validator/message/function/validatable';
import Pattern from '../pattern/user';
import {MatchParameters, MatchType} from '@alirya/string/validatable/match';
import Value from "@alirya/value/value";
import UserMessage from './string/user';
import Validatable from "@alirya/validator/value/validatable";
import PatternContainer from "@alirya/string/pattern/pattern/pattern";

export function UserParameters(
    source : string,
) : MatchType<string, string>;

export function UserParameters<MessageT>(
    source : string,
    message: ValidatableParameters<string, MessageT, [RegExp]>
) : MatchType<string, MessageT>;

export function UserParameters<MessageT>(
    source : string,
    message: ValidatableParameters<string, MessageT|string, [RegExp]> = (value, valid, pattern) => UserMessage.Parameters(value, valid)
)  : MatchType<string, string|MessageT> {

    return new MatchParameters(
        source,
        new RegExp(`^${Pattern.source}*$`, Pattern.flags),
        message
    );
}


export interface UserArgument<MessageType> extends Value<string> {

    message ?: ValidatableParameter<string, MessageType|string, Validatable<string> & PatternContainer>
}

export function UserParameter(
    {
        value,
    } : Omit<UserArgument<string>, 'message'>
) : MatchType<string, string>;

export function UserParameter<MessageT>(
    {
        value,
        message,
    } : Required<UserArgument<MessageT>>
) : MatchType<string, MessageT>;

export function UserParameter<MessageT>(
    {
        value,
        message = UserMessage.Parameter,
    } : Required<UserArgument<MessageT|string>>
)  : MatchType<string, string|MessageT> {

    return UserParameters(value, (value, valid, pattern) => message({value, valid, pattern}));
}


namespace User {
    export const Parameters = UserParameters;
    export const Parameter = UserParameter;
    export type Argument<MessageType> = UserArgument<MessageType>;
}
export default User;
