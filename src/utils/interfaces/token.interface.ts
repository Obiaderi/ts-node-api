import { Schema } from 'mongoose';

interface IToken extends Object {
    id: Schema.Types.ObjectId;
    expireIn: number | string;
}

export default IToken;
