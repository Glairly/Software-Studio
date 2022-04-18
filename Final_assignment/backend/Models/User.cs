using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public enum role {
        CLIENT,
        ADMIN,
         
    }
    public class User
    {
        public long Id { get; set; }
        public String? Name { get; set; }
        public String? Username { get; set; }
        public String? Password { get; set; }
        public role Role { get; set;}
        public long Point { get; set; }
        public String? Picture { get; set; }
        public Boolean? Disabled { get; set; }
    }

    public class UserCollection
    {
        public Meta meta { get; set; }
        public List<User> collection { get; set; }
    }


    public static class UserContext
    {

        public static string jsonPath = "./DB/Users.json";
        public static class Users
        {

            public static List<User> get()
            {

                UserCollection val = new UserCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<UserCollection>(sr.ReadToEnd());
                    sr.Close();
                }
                catch (Exception e) { }


                return val.collection;
            }

            public static List<User> add(User item)
            {
                UserCollection val = new UserCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<UserCollection>(sr.ReadToEnd());
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
                UserCollection val = new UserCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<UserCollection>(sr.ReadToEnd());
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

            public static User update(User item)
            {
                UserCollection val = new UserCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<UserCollection>(sr.ReadToEnd());
                    var obj = val.collection.FirstOrDefault(x => x.Id == item.Id);
                    if (obj != null)
                    {
                        if(item.Name != null)
                        obj.Name = item.Name;
                        if(item.Role != null)
                        obj.Role = item.Role;
                        if(item.Point != null)
                        obj.Point = item.Point;
                        if(item.Picture != null)
                        obj.Picture = item.Picture;
                        if(item.Disabled != null)
                        obj.Disabled = item.Disabled;
                        if(item.Password != null)
                        obj.Password = item.Password;
                    }
                    sr.Close();
                }
                catch (Exception e) { }

                string json = JsonConvert.SerializeObject(val);
                System.IO.File.WriteAllText(jsonPath, json);

                return item;
            }

            public static User updatePassword(User item)
            {
                UserCollection val = new UserCollection();

                try
                {
                    StreamReader sr = new StreamReader(jsonPath);
                    val = JsonConvert.DeserializeObject<UserCollection>(sr.ReadToEnd());
                    var obj = val.collection.FirstOrDefault(x => x.Id == item.Id);
                    if (obj != null)
                    {
                        obj.Password = item.Password;
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
                    UserCollection val = new UserCollection();
                    val.meta = new Meta() { recordNum = 0 };
                    val.collection = new List<User>();
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