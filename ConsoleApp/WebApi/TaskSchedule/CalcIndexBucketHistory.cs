using Collections;
using Models;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.TaskSchedule
{
    public class CalcIndexBucketHistory : IJob
    {
        public Task Execute(IJobExecutionContext context)
        {
            RealTimeIndexCollection realTimeIndexCollection = new RealTimeIndexCollection();
            var lstRealTimeIndex = realTimeIndexCollection.GetItems();

            lstRealTimeIndex.ForEach(index => index.Time = index.Time.Value.ToLocalTime());

            var lstIndexBucket = new List<IndexBucketHistory>();
            var lstGroups = lstRealTimeIndex.GroupBy(index => new { index.ApartmentCode, index.Type });
            foreach(var group in lstGroups)
            {
                var arrayMeasurements = new double?[24];
                var arrayCounts = new int?[24];

                var yesterday = DateTime.Now.AddDays(-1);
                var indexBucket = new IndexBucketHistory {
                    ApartmentCode = group.Key.ApartmentCode,
                    Type = group.Key.Type,
                    Date = yesterday.ToString("dd/MM/yyyy"),
                };
                var lstIndex = group.ToList();
                lstIndex.ForEach(index =>
                {
                    for(int i = 0; i <= 23; i++)
                    {
                        if(index.Time.Value.Hour == i)
                        {
                            arrayCounts[i] = arrayCounts[i] == null ? 1 : arrayCounts[i] ++;
                            arrayMeasurements[i] = arrayMeasurements[i] == null ? 0 + index.Value : (arrayMeasurements[i] + index.Value) / arrayCounts[i];
                        }
                    }
                });

                indexBucket.Measurements = arrayMeasurements.ToList();

                int count = 0;
                double sum = 0;
                indexBucket.Measurements.ForEach(measurement =>
                {
                    if(measurement != null)
                    {
                        count++;
                        sum += measurement.Value;
                    }
                });
                indexBucket.Count = count;
                indexBucket.Sum = sum;

                lstIndexBucket.Add(indexBucket);
            }

            var indexBucketHistoryCollection = new IndexBucketHistoryCollection();
            indexBucketHistoryCollection.InsertItems(lstIndexBucket);

            lstRealTimeIndex.ForEach(index => realTimeIndexCollection.DeleteIndex_ById(index));

            return Task.CompletedTask;
        }
    }
}
