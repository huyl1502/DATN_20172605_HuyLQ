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

namespace WebApi.Controllers
{
    [ApiController]
    [Route("Apartment")]
    public class ApartmentController : ControllerBase
    {
        ApartmentCollection _collection = new ApartmentCollection();
        ApartmentDTO _response = new ApartmentDTO();

        [HttpGet]
        [Route("GetAll")]
        public ApartmentDTO GetAllApartment()
        {
            var lstItem = _collection.GetItems();
            if (lstItem is not null)
            {
                lstItem.ForEach(item =>
                {
                    item.StatusName = Utils.Utility.GetDictionaryValue(MyDictionary.Apartment.dctStatus, item.Status);
                });
            }
            _response.ListItems = lstItem;
            return _response;
        }

        [HttpPost]
        [Route("AddNew")]
        public void AddNewApartment(ApartmentDTO request)
        {
            _collection.InsertItem(request.Item);
        }

        [HttpPost]
        [Route("Edit")]
        public void EditApartment(ApartmentDTO request)
        {
            _collection.UpdateItem(request.Item);
        }

        [HttpPost]
        [Route("getItem2Display")]
        public ApartmentDTO getItem2Display(ApartmentDTO request)
        {
            var item = _collection.GetApartment_By(request.Code);
            item.StatusName = Utils.Utility.GetDictionaryValue(MyDictionary.Apartment.dctStatus, item.Status);
            _response.Item = item;
            return _response;
        }

        [HttpGet]
        [Route("SetupAddNew")]
        public ApartmentDTO SetupAddNew()
        {
            var lstStatus = MyDictionary.Apartment.dctStatus.ToList();
            _response.ListStatus = lstStatus;
            return _response;
        }
    }
}
