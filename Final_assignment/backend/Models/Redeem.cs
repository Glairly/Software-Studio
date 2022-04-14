using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Redeem
    {
        public long Id { get; set; }
        public long Owner { get; set; }
        public long RedeemItem { get; set; }
        public long Amount { get; set; }

    }

    public class RedeemCollection
    {
        public Meta meta { get; set; }
        public List<Redeem> collection { get; set; }
    }


    public static class RedeemContext
    {

        public static string jsonPath = "./DB/Redeem/redeemed.json";
        public static class Redeems
        {

            public static List<Redeem> get()
            {

                RedeemCollection val = new RedeemCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<RedeemCollection>(sr.ReadToEnd());
                    sr.Close();
                }
                catch (Exception e) { }


                return val.collection;
            }

            public static List<Redeem> add(Redeem item)
            {
                RedeemCollection val = new RedeemCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<RedeemCollection>(sr.ReadToEnd());
                    item.Id = val.meta.recordNum;
                    val.meta = new Meta() { recordNum = val.meta.recordNum + 1 };
                    val.collection.Add(item);
                    sr.Close();
                }
                catch (Exception e)
                {
                }

                string json = JsonConvert.SerializeObject(val);
                System.IO.File.WriteAllText(jsonPath, json);

                return val.collection;
            }

            public static Boolean remove(long id)
            {
                RedeemCollection val = new RedeemCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<RedeemCollection>(sr.ReadToEnd());
                    var idx = val.collection.FindIndex(x => x.Id == id);
                    val.collection.RemoveAt(idx);
                    sr.Close();

                    string json = JsonConvert.SerializeObject(val);
                    System.IO.File.WriteAllText(jsonPath, json); return true;
                }
                catch (Exception e)
                {
                    return false;
                }

            }

            public static Redeem update(Redeem item)
            {
                RedeemCollection val = new RedeemCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<RedeemCollection>(sr.ReadToEnd());
                    var obj = val.collection.FirstOrDefault(x => x.Id == item.Id);
                    if (obj != null)
                    {
                        obj.Amount = item.Amount;
                    }
                    sr.Close();
                }
                catch (Exception e) { }

                string json = JsonConvert.SerializeObject(val);
                System.IO.File.WriteAllText(jsonPath, json);

                return item;
            }

            public static Boolean init()
            {
                try
                { 
                    RedeemCollection val = new RedeemCollection();
                    val.meta = new Meta() { recordNum = 0 };
                    val.collection = new List<Redeem>();
                    string json = JsonConvert.SerializeObject(val);
                    System.IO.File.WriteAllText(jsonPath, json);
                    return true;
                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }
    }
}