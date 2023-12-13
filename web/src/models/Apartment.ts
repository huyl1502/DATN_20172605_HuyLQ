import Person from "./Person";

export default class Apartment {
    public Code?: string;
    public Name?: string;
    public Status?: number;
    public Description?: string;
    public ListPerson?: Array<Person>;

    public StatusName?: string;
}