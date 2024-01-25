using Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Collections
{
    public class DeviceCollection : BaseCollection<Device>
    {
        public override string CollectionName
        {
            get
            {
                return "Device";
            }
        }

        public Device GetApartment_ByCode(string code)
        {
            var filter = Builders<Device>.Filter.Eq(Device.C_Code, code);
            var rs = Collection.Find<Device>(filter);
            return rs.ToList().FirstOrDefault();
        }
    }
}
