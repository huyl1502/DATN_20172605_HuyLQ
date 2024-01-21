import IndexBucketHistory from "./IndexBucketHistory";
import Person from "./Person";
import RealTimeIndex from "./RealTimeIndex";

export default class Apartment {
    public Code?: string;
    public Name?: string;
    public Status?: number;
    public Description?: string;
    public ListPerson?: Array<Person>;

    public StatusName?: string;
    public ListIndexBucketHis?: Array<IndexBucketHistory>;
    public ListRealTimeIndex?: Array<RealTimeIndex>;
}