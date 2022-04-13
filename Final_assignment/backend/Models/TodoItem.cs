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


    public static class TodoItemContext {

        public static class Todos {

            public static List<TodoItem> get(){

                List<TodoItem> val = new List<TodoItem>();

                StreamReader sr = new StreamReader("./DB/Index.json");

                val = JsonConvert.DeserializeObject<List<TodoItem>>(sr.ReadToEnd());
                
                return val;
            }

            public static List<TodoItem> addDummy(){

                TodoItem dummy = new TodoItem {Id = 9999, Name = "Glairly", IsComplete = false};

                List<TodoItem> val = new List<TodoItem>();

                StreamReader sr = new StreamReader("./DB/Index.json");

                val = JsonConvert.DeserializeObject<List<TodoItem>>(sr.ReadToEnd());
                
                val.Add(dummy);

                string json = JsonConvert.SerializeObject(val);
                System.IO.File.WriteAllText("./DB/Index2.json", json);

                return val;
            }
        }
    }
}