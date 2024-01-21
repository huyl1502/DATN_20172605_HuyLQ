using Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Collections
{
    public class IndexBucketHistoryCollection : BaseCollection<IndexBucketHistory>
    {
        public override string CollectionName
        {
            get
            {
                return "IndexBucketHistory";
            }
        }

        public List<IndexBucketHistory> GetListIndexBucketHis_ByApartmentCodeAndDay(string apartmentCode, DateTime date)
        {
            var filter = Builders<IndexBucketHistory>.Filter.Eq(filter => filter.ApartmentCode, apartmentCode);
            filter &= Builders<IndexBucketHistory>.Filter.Eq(filter => filter.Date, date.ToString("dd/MM/yyyy"));

            var rs = Collection.Find<IndexBucketHistory>(filter);
            return rs.ToList();
        }
    }
}
