using ConsoleApp.Common;
using System;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            AsyncEngine.Start(new Program());

            while (BaseController.Client != null) { }
        }
    }
}
