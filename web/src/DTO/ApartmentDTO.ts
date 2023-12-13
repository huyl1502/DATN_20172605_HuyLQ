import Apartment from "../models/Apartment";
import IKeyPairValue from "../models/IKeyPairValue";

export default class ApartmentDTO {
    public Code?: string;
    public Name?: string;
    public Apartment?: Apartment;
    public ListApartment?: Array<Apartment>;

    public ListStatus?: Array<IKeyPairValue<number, string>>;
}