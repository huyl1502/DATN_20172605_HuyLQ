using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Models;
using SharedComponent.DTO;
using ConsoleApp.Common;
using Collections;

namespace ConsoleApp.Controllers
{
    public class IndexController : BaseController
    {
        RealTimeIndexCollection _realTimeIndexCollection = new RealTimeIndexCollection();

        public void InsertMeasurement(List<RealTimeIndex> lstItem)
        {
            _realTimeIndexCollection.InsertItems(lstItem);
        }
    }
}
