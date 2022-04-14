using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Like
    {
        public long Id { get; set; }
        public long Blog { get; set; }
        public String? Owner { get; set; }
    }

    public class LikeCollection
    {
        public Meta meta { get; set; }
        public List<Like> collection { get; set; }
    }


    public static class LikeContext
    {

        public static string jsonPath = "./DB/Blog/Likes.json";
        public static class Likes
        {

            public static List<Like> get()
            {

                LikeCollection val = new LikeCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<LikeCollection>(sr.ReadToEnd());
                    sr.Close();
                }
                catch (Exception e) { }


                return val.collection;
            }

            public static List<Like> add(Like item)
            {
                LikeCollection val = new LikeCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<LikeCollection>(sr.ReadToEnd());
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
                LikeCollection val = new LikeCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<LikeCollection>(sr.ReadToEnd());
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

            // public static Like update(Like item)
            // {
            //     LikeCollection val = new LikeCollection();

            //     try
            //     {
            //         StreamReader sr = new StreamReader(jsonPath);
            //         val = JsonConvert.DeserializeObject<LikeCollection>(sr.ReadToEnd());
            //         var obj = val.collection.FirstOrDefault(x => x.Id == item.Id);
            //         if (obj != null)
            //         {
            //         }
            //         sr.Close();
            //     }
            //     catch (Exception e) { }

            //     string json = JsonConvert.SerializeObject(val);
            //     System.IO.File.WriteAllText(jsonPath, json);

            //     return item;
            // }

            public static Boolean init()
            {
                try
                { 
                    LikeCollection val = new LikeCollection();
                    val.meta = new Meta() { recordNum = 0 };
                    val.collection = new List<Like>();
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