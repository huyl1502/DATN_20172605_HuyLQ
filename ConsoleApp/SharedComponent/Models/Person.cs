using System;
using System.Collections.Generic;
using System.Linq;
using System.Models;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models
{
    public class Person : BaseModel
    {
        public const string C_Code = "Code";
        [JsonPropertyName(C_Code)]
        public string Code { get; set; }

        public const string C_Name = "Name";
        [JsonPropertyName(C_Name)]
        public string Name { get; set; }

        public const string C_Phone = "Phone";
        [JsonPropertyName(C_Phone)]
        public string Phone { get; set; }

        public const string C_Email = "Email";
        [JsonPropertyName(C_Email)]
        public string Email { get; set; }
    }
}
