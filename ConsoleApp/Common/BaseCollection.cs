using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace System
{
    public abstract class BaseCollection<T>
    {
        public abstract string CollectionName { get; }
        IMongoCollection<T> _collection;
        public IMongoCollection<T> Collection
        {
            get
            {
                if (_collection is null)
                {
                    _collection = Database.Db.GetCollection<T>(CollectionName);
                }
                return _collection;
            }
        }

        public void InsertItem(T item)
        {
            Collection.InsertOne(item);
        }

        public void InsertItems(List<T> lstItem)
        {
            Collection.InsertMany(lstItem);
        }

        public List<T> GetItems()
        {
            var filter = Builders<T>.Filter.Empty;
            var rs = Collection.Find<T>(filter);
            return rs.ToList();
        }
    }
}
