using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SharedComponent.DTO
{
    public class ApartmentDTO : BaseDTO<Apartment>
    {
        [JsonPropertyName("Code")]
        public string Code { get; set; }

        [JsonPropertyName("Name")]
        public string Name { get; set; }

        [JsonPropertyName("ListStatus")]
        public List<KeyValuePair<int, string>> ListStatus { get; set; }
    }
}
