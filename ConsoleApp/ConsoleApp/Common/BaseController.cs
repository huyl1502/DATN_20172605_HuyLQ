using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Models;
using System.Text;
using System.Threading.Tasks;
using ConsoleApp.Models.Constant;
using Models;

namespace ConsoleApp.Common
{
    public class BaseController : Controller
    {
        static ConnectionFactory _factory = new ConnectionFactory { HostName = "localhost" };
        static IConnection _connection;
        public static IConnection Connection
        {
            get
            {
                if (_connection == null)
                {
                    Connect(5);
                }
                return _connection;
            }
        }
        static IModel _channel;

        static void MsgReceived(object model, BasicDeliverEventArgs ea)
        {
            try
            {
                var body = ea.Body.ToArray();

                var message = Encoding.UTF8.GetString(body);
                var context = Newtonsoft.Json.Linq.JObject
                .Parse(message)
                .ToObject<RealTimeIndex>();

                var c = Engine.GetController<BaseController>("Index");

                var action = c.GetMethod("InsertMeasurement");
                if (action != null)
                {
                    var v = context ?? new object { };
                    AsyncEngine.CreateThread(() => action.Invoke(c, new object[] { v }));
                }
            }
            catch (Exception ex)
            {
                Screen.Error(ex.Message);
            }
        }

        static void Connect(int checkConnectionSeconds = 0)
        {
            if (_connection != null && _connection.IsOpen) return;
            _connection.ConnectionShutdown += (s, e) =>
            {
                Screen.Warning("Connection closed");
            };

            _connection = _factory.CreateConnection();
            _channel = _connection.CreateModel();
            _channel.ExchangeDeclare(exchange: "indexs", type: ExchangeType.Fanout);
            var queueName = _channel.QueueDeclare().QueueName;
            _channel.QueueBind(queue: queueName,
                              exchange: "indexs",
                              routingKey: string.Empty);

            Console.WriteLine(" [*] Waiting for indexs.");

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += MsgReceived;

            if (checkConnectionSeconds > 0)
            {
                int interval = checkConnectionSeconds * 1000;
                AsyncEngine.CreateThread(() =>
                {
                    while (true)
                    {
                        System.Threading.Thread.Sleep(interval);
                        Connect();
                    }
                });
            }
        }
    }
}
