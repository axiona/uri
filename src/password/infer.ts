import Password from './password/password.js';

type Infer<Type> = Type extends Password<infer As> ? As : never;

export default Infer;
