using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Blog
    {
        public long Id { get; set; }
        public long Owner { get; set; }
        public string? Tags { get; set; }

        public string? Title { get; set; }
        public string? Content { get; set; }
        public string? Picture { get; set; }

    }

    public class BlogCollection
    {
        public Meta meta { get; set; }
        public List<Blog> collection { get; set; }
    }


    public static class BlogContext
    {

        public static string jsonPath = "./DB/Blog/Index.json";
        public static class Blogs
        {

            public static List<Blog> get()
            {

                BlogCollection val = new BlogCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<BlogCollection>(sr.ReadToEnd());
                    sr.Close();
                }
                catch (Exception e) { }


                return val.collection;
            }

            public static List<Blog> add(Blog item)
            {
                BlogCollection val = new BlogCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<BlogCollection>(sr.ReadToEnd());
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
                BlogCollection val = new BlogCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<BlogCollection>(sr.ReadToEnd());
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

            public static Blog update(Blog item)
            {
                BlogCollection val = new BlogCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<BlogCollection>(sr.ReadToEnd());
                    var obj = val.collection.FirstOrDefault(x => x.Id == item.Id);
                    if (obj != null)
                    {
                        obj.Title = item.Title;
                        obj.Content = item.Content;
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
                    BlogCollection val = new BlogCollection();
                    val.meta = new Meta() { recordNum = 0 };
                    val.collection = new List<Blog>();
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