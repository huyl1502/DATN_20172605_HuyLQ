using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utils
{
    public class Utility
    {
        public static TValue GetDictionaryValue<Tkey, TValue>(Dictionary<Tkey, TValue> dict, Tkey key)
        {
            TValue rs;
            dict.TryGetValue(key, out rs);
            return rs;
        }
    }
}
