import Account from "../models/Account";
import User from "../models/User";
import BaseDTO from "./BaseDTO";

export default class UserDTO extends BaseDTO<User> {
    public Account?: Account;
}