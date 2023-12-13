using System;
using System.Collections.Generic;
using System.Linq;
using System.Models;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models
{
    public class RealTimeIndex : BaseModel
    {
        public const string C_ApartmentCode = "ApartmentCode";
        [JsonPropertyName(C_ApartmentCode)]
        public string ApartmentCode { get; set; }

        public const string C_Time = "Time";
        [JsonPropertyName(C_Time)]
        public DateTime Time { get; set; }

        public const string C_Measurement = "Measurement";
        [JsonPropertyName(C_Measurement)]
        public List<Index> Measurement { get; set; }
    }
}
