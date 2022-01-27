import jwt_decode from "jwt-decode";
import { token } from './token';

export const decoded = jwt_decode(token);