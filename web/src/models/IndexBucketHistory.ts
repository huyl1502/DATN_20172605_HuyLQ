import Index from "./Index";

export default class IndexBucketHistory {
    public ApartmentCode?: string;
    public Date?: Date;
    public Count?: number;
    public Sum?: number;
    public Measurements?: Array<Index>;
}