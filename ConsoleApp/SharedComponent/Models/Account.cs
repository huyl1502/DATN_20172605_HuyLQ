using System;
using System.Collections.Generic;
using System.Linq;
using System.Models;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models
{
    public class Account : BaseModel
    {
        public const string C_UserName = "UserName";
        [JsonPropertyName(C_UserName)]
        public string UserName { get; set; }

        public const string C_PassWord = "PassWord";
        [JsonPropertyName(C_PassWord)]
        public string PassWord { get; set; }

        public const string C_PersonCode = "PersonCode";
        [JsonPropertyName(C_PersonCode)]
        public string PersonCode { get; set; }
    }
}
