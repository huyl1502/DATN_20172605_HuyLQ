import Device from "../models/Device";
import IKeyPairValue from "../models/IKeyPairValue";
import BaseDTO from "./BaseDTO";

export default class ApartmentDTO extends BaseDTO<Device> {
    public Code?: string;
    public Name?: string;

    public ListStatus?: Array<IKeyPairValue<number, string>>;
}