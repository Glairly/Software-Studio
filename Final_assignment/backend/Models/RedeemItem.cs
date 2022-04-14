using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class RedeemItem
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public long Price { get; set; }
        public String Description { get; set; }
        public List<String> Tags { get; set; }
        public String Picture { get; set; }

    }
    public class RedeemItemCollection
    {
        public Meta meta { get; set; }
        public List<RedeemItem> collection { get; set; }
    }


    public static class RedeemItemContext
    {

        public static string jsonPath = "./DB/Redeem/item.json";
        public static class Redeems
        {

            public static List<RedeemItem> get()
            {

                RedeemItemCollection val = new RedeemItemCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<RedeemItemCollection>(sr.ReadToEnd());
                    sr.Close();
                }
                catch (Exception e) { }


                return val.collection;
            }

            public static List<RedeemItem> add(RedeemItem item)
            {
                RedeemItemCollection val = new RedeemItemCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<RedeemItemCollection>(sr.ReadToEnd());
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
                RedeemItemCollection val = new RedeemItemCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<RedeemItemCollection>(sr.ReadToEnd());
                    var idx = val.collection.FindIndex(x => x.Id == id);
                    val.collection.RemoveAt(idx);
                    sr.Close();

                    string json = JsonConvert.SerializeObject(val);
                    System.IO.File.WriteAllText(jsonPath, json); 
                    return true;
                }
                catch (Exception e)
                {
                    return false;
                }

            }

            public static RedeemItem update(RedeemItem item)
            {
                RedeemItemCollection val = new RedeemItemCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<RedeemItemCollection>(sr.ReadToEnd());
                    var obj = val.collection.FirstOrDefault(x => x.Id == item.Id);
                    if (obj != null)
                    {
                        obj.Name = item.Name;
                        obj.Price = item.Price;
                        obj.Description = item.Description;
                        obj.Tags = item.Tags;
                        obj.Picture = item.Picture;
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
                    RedeemItemCollection val = new RedeemItemCollection();
                    val.meta = new Meta() { recordNum = 0 };
                    val.collection = new List<RedeemItem>();
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