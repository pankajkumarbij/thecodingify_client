import jwt_decode from "jwt-decode";
import { token } from './token';

var u="no user";
if(token!=="no token"){
    u=jwt_decode(token);
}
export const user = u;