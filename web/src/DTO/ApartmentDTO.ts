import Apartment from "../models/Apartment";
import IKeyPairValue from "../models/IKeyPairValue";
import BaseDTO from "./BaseDTO";

export default class ApartmentDTO extends BaseDTO<Apartment> {
    public Code?: string;
    public Name?: string;
    public Date?: Date;

    public ListStatus?: Array<IKeyPairValue<number, string>>;
}