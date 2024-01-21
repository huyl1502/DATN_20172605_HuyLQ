using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedComponent.Constant
{
    public static class Enums
    {
        public enum ResponseStatus
        {
            Succucess = 0,
            Error = 1,
        }

        public enum IndexType
        {
            Temp = 1,
            Humidity = 2,
            Gas = 3,
        }
    }
}
