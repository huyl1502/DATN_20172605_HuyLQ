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
    [ApiController]
    [Route("Apartment")]
    public class ApartmentController : ControllerBase
    {
        ApartmentCollection _collection = new ApartmentCollection();
        ApartmentDTO _response = new ApartmentDTO();

        #region Validate
        void Validate(Apartment item)
        {
            if (string.IsNullOrEmpty(item.Code)
                || string.IsNullOrEmpty(item.Name)
                || !item.Status.HasValue)
                throw new Exception();
        }
        #endregion

        [HttpGet]
        [Route("GetAll")]
        public ApartmentDTO GetAllApartment()
        {
            var lstItem = _collection.GetItems();
            if (lstItem is not null)
            {
                lstItem.ForEach(item =>
                {
                    item.StatusName = Utils.Utility.GetDictionaryValue(MyDictionary.Apartment.dctStatus, item.Status.Value);
                });
            }
            _response.ListItems = lstItem;
            return _response;
        }

        [HttpPost]
        [Route("AddNew")]
        public ApartmentDTO AddNewApartment(ApartmentDTO request)
        {
            var item = request.Item;
            Validate(item);
            _collection.InsertItem(request.Item);
            return _response;
        }

        [HttpPost]
        [Route("Edit")]
        public void EditApartment(ApartmentDTO request)
        {
            var item = request.Item;
            Validate(item);
            _collection.UpdateItem(item);
        }

        [HttpPost]
        [Route("GetItem2Display")]
        public ApartmentDTO getItem2Display(ApartmentDTO request)
        {
            var item = _collection.GetApartment_ByCode(request.Code);
            item.StatusName = Utils.Utility.GetDictionaryValue(MyDictionary.Apartment.dctStatus, item.Status.Value);
            _response.Item = item;

            var indexBucketHisCollection = new IndexBucketHistoryCollection();
            var date = request.Date.HasValue ? request.Date : DateTime.Now.AddDays(-1);
            var lstIndexBucketHis = indexBucketHisCollection.GetListIndexBucketHis_ByApartmentCodeAndDay(request.Code, date.Value);
            _response.Item.ListIndexBucketHis = lstIndexBucketHis;

            var realTimeIndexCollection = new RealTimeIndexCollection();
            var indexTemp = realTimeIndexCollection.GetListRealTimeIndex_ByCodeAndType(request.Code, (int)IndexType.Temp);
            var indexHumidity = realTimeIndexCollection.GetListRealTimeIndex_ByCodeAndType(request.Code, (int)IndexType.Humidity);
            var indexGas = realTimeIndexCollection.GetListRealTimeIndex_ByCodeAndType(request.Code, (int)IndexType.Gas);
            indexTemp.AddRange(indexHumidity);
            indexTemp.AddRange(indexGas);
            _response.Item.ListRealTimeIndex = indexTemp;

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
