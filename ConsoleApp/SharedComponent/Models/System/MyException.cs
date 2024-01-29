using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SharedComponent.Models.System
{
    public class MyException : Exception
    {
        public int StatusCode { get; set; }
        public string Msg { get; set; }

        public MyException(string msg)
        {
            StatusCode = (int)HttpStatusCode.InternalServerError;
            Msg = msg;
        }

        public MyException(int code, string msg)
        {
            StatusCode = code;
            Msg = msg;
        }
    }
}
