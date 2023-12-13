using Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Collections
{
    public class ApartmentCollection : BaseCollection<Apartment>
    {
        public override string CollectionName
        {
            get
            {
                return "Apartment";
            }
        }

        public void UpdateItem(Apartment item)
        {
            var filter = Builders<Apartment>.Filter.Eq(Apartment.C_Code, item.Code);
            var update = Builders<Apartment>.Update.Set(apartment => apartment.Name, item.Name);
            Collection.FindOneAndUpdate<Apartment>(filter, update);
        }

        public Apartment GetApartment_By(string code)
        {
            var filter = Builders<Apartment>.Filter.Eq(Apartment.C_Code, code);
            var rs = Collection.Find<Apartment>(filter);
            return rs.ToList().FirstOrDefault();
        }
    }
}
