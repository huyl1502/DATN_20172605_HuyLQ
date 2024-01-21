using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SharedComponent.DTO
{
    public class AccountDTO
    {
        [JsonPropertyName("Account")]
        public Account Account { get; set; }
    }
}
