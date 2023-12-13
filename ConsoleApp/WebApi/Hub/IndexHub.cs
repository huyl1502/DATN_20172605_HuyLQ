using Collections;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using SignalR = Microsoft.AspNetCore.SignalR;

namespace WebApi.Hub
{
    public class IndexHub : SignalR.Hub
    {
        public void GetLastIndex_ByApartmentCode(string code)
        {
            ApartmentCollection apartmentCollection = new ApartmentCollection();
            Thread thread = new Thread(() => {
                apartmentCollection.GetApartment_By(code);
                Clients.All.SendAsync("GetLastIndex_ByApartmentCode_Response", "1");
            });
            thread.Start();
        }
    }
}
