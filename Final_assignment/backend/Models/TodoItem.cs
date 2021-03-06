using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public bool IsComplete { get; set; }
    }

    public struct Meta
    {
        public long recordNum { get; set; }
    }
    public class TodoCollection
    {
        public Meta meta { get; set; }
        public List<TodoItem> collection { get; set; }
    }


    public static class TodoItemContext
    {

        public static string jsonPath = "./DB/Index.json";
        public static class Todos
        {

            public static List<TodoItem> get()
            {

                TodoCollection val = new TodoCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<TodoCollection>(sr.ReadToEnd());
                    sr.Close();
                }
                catch (Exception e) { }


                return val.collection;
            }

            public static List<TodoItem> add(TodoItem item)
            {
                TodoCollection val = new TodoCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<TodoCollection>(sr.ReadToEnd());
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
                TodoCollection val = new TodoCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<TodoCollection>(sr.ReadToEnd());
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

            public static TodoItem update(TodoItem item)
            {
                TodoCollection val = new TodoCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<TodoCollection>(sr.ReadToEnd());
                    var obj = val.collection.FirstOrDefault(x => x.Id == item.Id);
                    if (obj != null)
                    {
                        obj.Name = item.Name;
                        obj.IsComplete = item.IsComplete;
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
                    TodoCollection val = new TodoCollection();
                    val.meta = new Meta() { recordNum = 0 };
                    val.collection = new List<TodoItem>();
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