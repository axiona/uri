import Dynamic from '@alirya/validator/message/function/validatable-parameters';
import Callback, { CallbackFunctionType } from '@alirya/validator/validatable/callback-function-parameters';
import HostBoolean from '../boolean/host';
import HostMessage from './string/host';
import Value from '@alirya/value/value';
import Validatable from '@alirya/validatable/validatable';
import ToString from "@alirya/string/to-string";
import AssertedToString from "@alirya/string/validatable/asserted-to-string";

export default function Host(
    string : string,
) : CallbackFunctionType<string, string, string> & ToString;
export default function Host<MessageType>(
    string : string,
    message: Dynamic<string, MessageType>
) : CallbackFunctionType<string, string, MessageType> & ToString;
export default function Host<MessageType>(
    string : string,
    message : Dynamic<string, string|MessageType>= HostMessage
) {
    return AssertedToString(Callback<string, string>(string, HostBoolean, message));
}

