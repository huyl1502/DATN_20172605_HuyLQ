using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Models;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models
{
    public class Device : BaseModel
    {
        public const string C_Code = "Code";
        [JsonPropertyName(C_Code)]
        public string Code { get; set; }

        public const string C_Description = "Description";
        [JsonPropertyName(C_Description)]
        [BsonIgnoreIfNull]
        public string Description { get; set; }

        public const string C_Status = "Status";
        [JsonPropertyName(C_Status)]
        public int? Status { get; set; }

        public const string C_StatusName = "StatusName";
        [JsonPropertyName(C_StatusName)]
        [BsonIgnoreIfNull]
        public string StatusName { get; set; }
    }
}
