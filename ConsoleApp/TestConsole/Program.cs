using Models;
using Collections;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using uPLibrary.Networking.M2Mqtt;
using System.Collections.Specialized;
using static SharedComponent.Constant.Enums;

namespace TestConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            Simulator();
            //InsertIndexBucketHistory();
        }

        static void InsertIndexBucketHistory()
        {
            Random rand = new Random();

            var lstTemp = new List<double?>();
            var lstHumidity = new List<double?>();
            var lstGas = new List<double?>();
            for(int i = 1; i <= 24; i++)
            {
                lstTemp.Add(rand.NextDouble() * 5);
                lstHumidity.Add(rand.NextDouble() * 10);
                lstGas.Add(rand.NextDouble());
            }

            var lstIndexBucketHis = new List<IndexBucketHistory>()
            {
                new IndexBucketHistory ()
                {
                    ApartmentCode = "NhaCuaHuy001",
                    Count = 24,
                    Date = DateTime.Now.ToString("dd/MM/yyyy"),
                    Type = (int)IndexType.Temp,
                    Measurements = lstTemp,
                    Sum = 630,
                },
                new IndexBucketHistory ()
                {
                    ApartmentCode = "NhaCuaHuy001",
                    Count = 24,
                    Date = DateTime.Now.ToString("dd/MM/yyyy"),
                    Type = (int)IndexType.Humidity,
                    Measurements = lstHumidity,
                    Sum = 1500,
                },
                new IndexBucketHistory ()
                {
                    ApartmentCode = "NhaCuaHuy001",
                    Count = 24,
                    Date = DateTime.Now.ToString("dd/MM/yyyy"),
                    Type = (int)IndexType.Gas,
                    Measurements = lstGas,
                    Sum = 100,
                }
            };

            IndexBucketHistoryCollection collection = new IndexBucketHistoryCollection();
            collection.InsertItems(lstIndexBucketHis);
        }

        static void Simulator()
        {
            Random rand = new Random();
            ApartmentCollection collection = new ApartmentCollection();
            var lstApartments = collection.GetItems();
            if (lstApartments is not null)
            {
                lstApartments.ForEach(apartment =>
                {
                    Thread thread = new Thread(() =>
                    {
                        var mqttClient = new MqttClient(
                            "broker.emqx.io",
                            1883,
                            false,
                            MqttSslProtocols.None,
                            null,
                            null
                        );
                        var clientId = Guid.NewGuid().ToString();
                        mqttClient.Connect(clientId);

                        while (true)
                        {
                            var tempIndex = rand.NextDouble() * 5;
                            var humidityIndex = rand.NextDouble() * 10;
                            var gasIndex = rand.NextDouble();

                            var tempData = new RealTimeIndex { ApartmentCode = apartment.Code, Time = DateTime.Now, Type = (int)IndexType.Temp, Value = tempIndex };
                            var humidityData = new RealTimeIndex { ApartmentCode = apartment.Code, Time = DateTime.Now, Type = (int)IndexType.Humidity, Value = humidityIndex };
                            var gasData = new RealTimeIndex { ApartmentCode = apartment.Code, Time = DateTime.Now, Type = (int)IndexType.Gas, Value = gasIndex };

                            var data = new List<RealTimeIndex>() { tempData, humidityData, gasData };

                            var message = Newtonsoft.Json.Linq.JArray.FromObject(data).ToString();
                            var body = Encoding.UTF8.GetBytes(message);

                            mqttClient.Publish("DATN20172605/Device", body);

                            Thread.Sleep(5000);
                        }
                    });
                    thread.Start();
                });
            }
        }
    }
}
