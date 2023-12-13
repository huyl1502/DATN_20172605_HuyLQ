using System;
using System.Collections.Generic;
using System.Linq;
using System.Models;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models
{
    public class IndexBucketHistory : BaseModel
    {
        public const string C_ApartmentCode = "ApartmentCode";
        [JsonPropertyName(C_ApartmentCode)]
        public string ApartmentCode { get; set; }

        public const string C_Date = "Date";
        [JsonPropertyName(C_Date)]
        public DateTime Date { get; set; }

        public const string C_Count = "Count";
        [JsonPropertyName(C_Count)]
        public int Count { get; set; }

        public const string C_Sum = "Sum";
        [JsonPropertyName(C_Sum)]
        public double Sum { get; set; }

        public const string C_Measurements = "Measurements";
        [JsonPropertyName(C_Measurements)]
        public List<Index> Measurements { get; set; }
    }
}
