using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Comment
    {
        public long Id { get; set; }
        public long Blog { get; set; }
        public String? Content { get; set; }
    }

    public class CommentCollection
    {
        public Meta meta { get; set; }
        public List<Comment> collection { get; set; }
    }


    public static class CommentContext
    {

        public static string jsonPath = "./DB/Blog/comments.json";
        public static class Comments
        {

            public static List<Comment> get()
            {

                CommentCollection val = new CommentCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<CommentCollection>(sr.ReadToEnd());
                    sr.Close();
                }
                catch (Exception e) { }


                return val.collection;
            }

            public static List<Comment> add(Comment item)
            {
                CommentCollection val = new CommentCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<CommentCollection>(sr.ReadToEnd());
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
                CommentCollection val = new CommentCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<CommentCollection>(sr.ReadToEnd());
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

            public static Comment update(Comment item)
            {
                CommentCollection val = new CommentCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<CommentCollection>(sr.ReadToEnd());
                    var obj = val.collection.FirstOrDefault(x => x.Id == item.Id);
                    if (obj != null)
                    {
                        obj.Content = item.Content;
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
                    CommentCollection val = new CommentCollection();
                    val.meta = new Meta() { recordNum = 0 };
                    val.collection = new List<Comment>();
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