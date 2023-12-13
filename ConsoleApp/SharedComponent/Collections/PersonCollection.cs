using Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Collections
{
    public class PersonCollection : BaseCollection<Person>
    {
        public override string CollectionName
        {
            get
            {
                return "Person";
            }
        }

        public List<Person> getItems()
        {
            var filter = Builders<Person>.Filter.Empty;
            var rs = Collection.Find<Person>(filter);
            return rs.ToList();
        }

        public void InsertItem(Person item)
        {
            Collection.InsertOne(item);
        }
    }
}
