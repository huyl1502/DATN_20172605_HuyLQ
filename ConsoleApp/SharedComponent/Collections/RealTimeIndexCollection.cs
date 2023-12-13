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

        public RealTimeIndex GetLastMeasurement()
        {
            var filter = Builders<RealTimeIndex>.Filter.Empty;
            var rs = Collection.Find<RealTimeIndex>(filter).ToList().FirstOrDefault();
            return rs;
        }
    }
}
