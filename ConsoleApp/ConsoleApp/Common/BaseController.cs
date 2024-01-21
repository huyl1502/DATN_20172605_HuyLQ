using System;
using System.Collections.Generic;
using System.Linq;
using System.Models;
using System.Text;
using System.Threading.Tasks;
using Models;
using uPLibrary.Networking.M2Mqtt;
using uPLibrary.Networking.M2Mqtt.Messages;
using static SharedComponent.Constant.Enums;

namespace ConsoleApp.Common
{
    public class BaseController : Controller
    {
        static string _topic = "DATN20172605/Device";
        static string _serverId;
        public static string ServerId
        {
            get
            {
                if (_serverId == null)
                {
                    _serverId = Guid.NewGuid().ToString();
                }
                return _serverId;
            }
        }

        static MqttClient _mqttClient;
        public static MqttClient Client
        {
            get
            {
                if (_mqttClient == null)
                {
                    _mqttClient = new MqttClient(
                    "broker.emqx.io",
                    1883,
                    false,
                    MqttSslProtocols.None,
                    null,
                    null
                );

                    ConnectMqtt(5);
                }
                return _mqttClient;
            }
        }

        static T GetMqttMessage<T>(MqttMsgPublishEventArgs e)
        {
            string content = System.Text.Encoding.UTF8.GetString(e.Message);
            try
            {
                var context = Newtonsoft.Json.Linq.JArray
                    .Parse(content)
                    .ToObject<T>();
                return context;
            }
            catch
            {
                string[] list = content.Split("~");

                var tempData = new RealTimeIndex { ApartmentCode = list[0], Time = DateTime.Now, Type = (int)IndexType.Temp, Value = Convert.ToDouble(list[(int)IndexType.Temp]) };
                var humidityData = new RealTimeIndex { ApartmentCode = list[0], Time = DateTime.Now, Type = (int)IndexType.Humidity, Value = Convert.ToDouble(list[(int)IndexType.Humidity]) };
                var gasData = new RealTimeIndex { ApartmentCode = list[0], Time = DateTime.Now, Type = (int)IndexType.Gas, Value = Convert.ToDouble(list[(int)IndexType.Gas]) };
                var data = new List<RealTimeIndex>() { tempData, humidityData, gasData };
                var message = Newtonsoft.Json.Linq.JArray.FromObject(data).ToString();

                var context = Newtonsoft.Json.Linq.JArray
                    .Parse(message)
                    .ToObject<T>();
                return context;
            }
        }

        static void MqttMsgReceived(object sender, MqttMsgPublishEventArgs e)
        {
            try
            {
                var data = GetMqttMessage<List<RealTimeIndex>>(e);
                Screen.Info($"Get Index!");

                var c = Engine.GetController<BaseController>("Index");

                var action = c.GetMethod("InsertMeasurement");
                if (action != null)
                {
                    var v = data ?? new object { };
                    AsyncEngine.CreateThread(() => action.Invoke(c, new object[] { v }));
                }
            }
            catch (Exception ex)
            {
                Screen.Error(ex.Message);
            }
        }

        static void ConnectMqtt(int checkConnectionSeconds = 0)
        {
            if (_mqttClient != null && _mqttClient.IsConnected) return;
            _mqttClient.MqttMsgPublishReceived += MqttMsgReceived;

            _mqttClient.Connect(ServerId);
            _mqttClient.ConnectionClosed += (s, e) =>
            {
                Screen.Warning("Connection closed");
            };

            if (_mqttClient.IsConnected)
            {
                Subscribe(_topic);
                Screen.Success("done\n");
            }

            if (checkConnectionSeconds > 0)
            {
                int interval = checkConnectionSeconds * 1000;
                AsyncEngine.CreateThread(() =>
                {
                    while (true)
                    {
                        System.Threading.Thread.Sleep(interval);
                        ConnectMqtt();
                    }
                });
            }
        }

        protected static void Subscribe(string topic)
        {
            _mqttClient.Subscribe(new string[] { topic }, new byte[] { 0 });
        }
    }
}
