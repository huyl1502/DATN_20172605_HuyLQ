using System;
using System.Collections.Generic;
using System.Linq;
using System.Models;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models
{
    public class Index : BaseModel
    {
        public const string C_Code = "Code";
        [JsonPropertyName(C_Code)]
        public string Code { get; set; }

        public const string C_Name = "Name";
        [JsonPropertyName(C_Name)]
        public string Name { get; set; }

        public const string C_Unit = "Unit";
        [JsonPropertyName(C_Unit)]
        public string Unit { get; set; }

        public const string C_Value = "Value";
        [JsonPropertyName(C_Value)]
        public double Value { get; set; }

        public const string C_ListValue = "ListValue";
        [JsonPropertyName(C_ListValue)]
        public List<double> ListValue { get; set; }
    }
}
