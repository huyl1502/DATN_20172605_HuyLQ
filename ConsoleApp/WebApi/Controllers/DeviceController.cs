using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Models;
using SharedComponent.DTO;
using Collections;
using SharedComponent.Constant;
using static SharedComponent.Constant.Enums;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("Device")]
    public class DeviceController : ControllerBase
    {
        DeviceCollection _collection = new DeviceCollection();
        DeviceDTO _response = new DeviceDTO();

        [HttpGet]
        [Route("GetAll")]
        public DeviceDTO GetAllDevice()
        {
            var lstItem = _collection.GetItems();
            if (lstItem is not null)
            {
                lstItem.ForEach(item =>
                {
                    item.StatusName = Utils.Utility.GetDictionaryValue(MyDictionary.Status.dctStatus, item.Status.Value);
                });
            }
            _response.ListItems = lstItem;
            return _response;
        }

        [HttpPost]
        [Route("AddNew")]
        public DeviceDTO AddNewDevice(DeviceDTO request)
        {
            var item = request.Item;
            _collection.InsertItem(request.Item);
            return _response;
        }

        [HttpPost]
        [Route("GetItem2Display")]
        public DeviceDTO getItem2Display(DeviceDTO request)
        {
            var item = _collection.GetDevice_ByCode(request.Code);
            item.StatusName = Utils.Utility.GetDictionaryValue(MyDictionary.Status.dctStatus, item.Status.Value);
            _response.Item = item;

            return _response;
        }

        [HttpGet]
        [Route("SetupAddNew")]
        public DeviceDTO SetupAddNew()
        {
            var lstStatus = MyDictionary.Status.dctStatus.ToList();
            _response.ListStatus = lstStatus;
            return _response;
        }
    }
}
