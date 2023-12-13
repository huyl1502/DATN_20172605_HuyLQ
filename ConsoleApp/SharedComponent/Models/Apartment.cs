using System;
using System.Collections.Generic;
using System.Linq;
using System.Models;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models
{
    public class Apartment : BaseModel
    {
        public const string C_Code = "Code";
        [JsonPropertyName(C_Code)]
        public string Code { get; set; }

        public const string C_Name = "Name";
        [JsonPropertyName(C_Name)]
        public string Name { get; set; }

        public const string C_Status = "Status";
        [JsonPropertyName(C_Status)]
        public int Status { get; set; }

        public const string C_Description = "Description";
        [JsonPropertyName(C_Description)]
        public string Description { get; set; }

        public const string C_ListPerson = "ListPerson";
        [JsonPropertyName(C_ListPerson)]
        public List<Person> ListPerson { get; set; }

        public const string C_StatusName = "StatusName";
        [JsonPropertyName(C_StatusName)]
        public string StatusName { get; set; }

    }
}
