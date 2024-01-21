using Collections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using static SharedComponent.Constant.Enums;
using SignalR = Microsoft.AspNetCore.SignalR;

namespace WebApi.Hub
{
    public class IndexHub : SignalR.Hub
    {
        IHubContext<IndexHub> _hubContext;
        public IndexHub(IHubContext<IndexHub> hubContext)
        {
            this._hubContext = hubContext;  // through this instance we access SignalR in a background tab
        }

        public void GetLastIndex_ByApartmentCode(string code)
        {
            RealTimeIndexCollection realTimeIndexCollection = new RealTimeIndexCollection();

            Thread thread = new Thread(() =>
            {
                while (true)
                {
                    Thread.Sleep(5000);
                    var indexTemp = realTimeIndexCollection.GetListRealTimeIndex_ByCodeAndType(code, (int)IndexType.Temp);
                    var indexHumidity = realTimeIndexCollection.GetListRealTimeIndex_ByCodeAndType(code, (int)IndexType.Humidity);
                    var indexGas = realTimeIndexCollection.GetListRealTimeIndex_ByCodeAndType(code, (int)IndexType.Gas);
                    indexTemp.AddRange(indexHumidity);
                    indexTemp.AddRange(indexGas);
                    _hubContext.Clients.All.SendAsync("GetLastIndex_ByApartmentCode_Response", indexTemp);
                }
            });
            thread.Start();
        }
    }
}
