using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SharedComponent.DTO
{
    public class BaseDTO<T>
    {
        [JsonPropertyName("Item")]
        public T Item { get; set; }

        [JsonPropertyName("ListItems")]
        public List<T> ListItems { get; set; }
    }
}
