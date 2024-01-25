using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedComponent.Constant
{
    public class MyDictionary
    {
        public static class Status
        {
            public static int Active = 1;
            public static int InActive = 0;

            public static Dictionary<int, string> dctStatus = new Dictionary<int, string>()
            {
                { Active, "Sử dụng" },
                {InActive, "Không sử dụng" }
            };
        }
    }
}
