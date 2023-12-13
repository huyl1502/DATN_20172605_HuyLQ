using Models;
using Collections;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;

namespace TestConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            Random rand = new Random();
            ApartmentCollection collection = new ApartmentCollection();
            var lstApartments = collection.GetItems();
            if (lstApartments is not null)
            {
                lstApartments.ForEach(apartment =>
                {
                    Thread thread = new Thread(() => {
                        var factory = new ConnectionFactory { HostName = "localhost" };
                        var connection = factory.CreateConnection();
                        var channel = connection.CreateModel();
                        channel.ExchangeDeclare(exchange: "indexs", type: ExchangeType.Fanout);

                        while(true)
                        {
                            var lstIndex = new List<Models.Index>() {
                            new Models.Index()
                            {
                                Code = "temp",
                                Name = "Nhiệt độ",
                                Unit = "doC",
                                Value = rand.NextDouble() * 5,
                            },
                            new Models.Index()
                            {
                                Code = "humidity",
                                Name = "Độ ẩm",
                                Unit = "%",
                                Value = rand.NextDouble() * 10,
                            },
                            new Models.Index()
                            {
                                Code = "gas",
                                Name = "Khí gas",
                                Unit = "cf",
                                Value = rand.NextDouble(),
                            },
                        };
                            var data = new RealTimeIndex();
                            data.ApartmentCode = apartment.Code;
                            data.Measurement = lstIndex;
                            data.Time = DateTime.Now;

                            var message = Newtonsoft.Json.Linq.JObject.FromObject(data).ToString();
                            var body = Encoding.UTF8.GetBytes(message);
                            channel.BasicPublish(exchange: "indexs",
                                                 routingKey: string.Empty,
                                                 basicProperties: null,
                                                 body: body);
                        }
                    });
                    thread.Start();
                });
            }

            Console.WriteLine("Hello World!");
        }
    }
}
