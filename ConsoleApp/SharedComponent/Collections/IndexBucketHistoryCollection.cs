using Models;
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
    }
}
