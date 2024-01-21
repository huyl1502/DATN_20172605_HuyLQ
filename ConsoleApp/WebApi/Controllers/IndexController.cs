using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Models;
using Collections;
using SharedComponent.DTO;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("Index")]
    public class IndexController : ControllerBase
    {
        RealTimeIndexDTO _response = new RealTimeIndexDTO();
        RealTimeIndexCollection _realTimeIndexCollection = new RealTimeIndexCollection();

        [HttpPost]
        [Route("InsertMeasurement")]
        public void InsertMeasurement(RealTimeIndexDTO request)
        {
            _realTimeIndexCollection.InsertItem(request.Item);
        }
    }
}
