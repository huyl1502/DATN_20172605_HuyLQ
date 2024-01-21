using Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Collections
{
    public class RealTimeIndexCollection : BaseCollection<RealTimeIndex>
    {
        public override string CollectionName
        {
            get
            {
                return "RealTimeIndex";
            }
        }

        public List<RealTimeIndex> GetListRealTimeIndex_ByCodeAndType(string ApartmentCode, int Type)
        {
            var builder = Builders<RealTimeIndex>.Filter;
            var filter = builder.Eq(f => f.ApartmentCode, ApartmentCode) & builder.Eq(f => f.Type, Type);

            var lstIndex = Collection.Aggregate().SortByDescending(index => index.Time).Match(filter).Limit(20).ToList().OrderBy(index => index.Time);
            return lstIndex.ToList();
        }

        public void DeleteIndex_ById(RealTimeIndex item)
        {
            var builder = Builders<RealTimeIndex>.Filter;
            var filter = builder.Eq(f => f.Id, item.Id);

            Collection.DeleteOne(filter);
        }
    }
}
