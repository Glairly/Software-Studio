using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

public class AuthController : Controller
{
    private readonly ILogger<AuthController> _logger;

    public AuthController(ILogger<AuthController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpGet]
    public JsonResult Test()
    {
        return Json(new { result = true });
    }

    public JsonResult List(bool IncludeDisabled)
    {
        return Json(new { result = UserContext.Users.get().FindAll(x => (IncludeDisabled ? true : x.Disabled != true)) });
    }

    [HttpGet]
    public JsonResult GetById(long id)
    {
        return Json(new { result = UserContext.Users.get().FirstOrDefault(x => x.Id == id) });
    }


    [HttpGet]
    public JsonResult GetById2(long id)
    {
        var blogs = BlogContext.Blogs.get().FindAll(x => x.Owner == id);

        if (blogs == null) return Json(new { result = false, message = "error" });
        else
        {
            long comments = 0;
            long likes = 0;
            foreach (var blog in blogs)
            {
                comments += CommentContext.Comments.get().FindAll(x => x.Blog == blog.Id).Count;
                likes += CommentContext.Comments.get().FindAll(x => x.Blog == blog.Id).Count;
            }

            return Json(new { result = new { user = UserContext.Users.get().FirstOrDefault(x => x.Id == id), comments = comments, likes = likes, blogs = blogs.Count } });
        }

    }


    [HttpPost]
    public JsonResult Add(User item)
    {
        // return Json(new {});
        var isExist = UserContext.Users.get().FirstOrDefault(x => x.Username == item.Username);
        if (isExist != null) return Json(new { result = false, message = "User is already exist with that username." });
        return Json(new { result = UserContext.Users.add(item).FirstOrDefault(x => x.Username == item.Username) });
    }

    [HttpPost]
    public JsonResult Init()
    {
        // return Json(new {});
        return Json(new { result = UserContext.Users.init() });
    }

    [HttpPut]
    public JsonResult Block(long id, bool status)
    {
        // return Json(new {});
        var user = UserContext.Users.get().FirstOrDefault(x => x.Id == id);
        if (user == null) return Json(new { result = false, message = "User not found." });
        user.Disabled = status;
        return Json(new { result = UserContext.Users.update(user) });
    }

    [HttpPut]
    public JsonResult Update(User item)
    {
        // return Json(new {});
        return Json(new { result = UserContext.Users.update(item) });
    }

    [HttpPut]
    public JsonResult ChangePassword(User item)
    {
        // return Json(new {});

        return Json(new { result = UserContext.Users.updatePassword(item) });
    }

    [HttpPut]
    public JsonResult ChangeRole(long id,role role)
    {
        // return Json(new {});
        var user = UserContext.Users.get().Find(x => x.Id == id);
        user.Role = role;
        return Json(new { result = UserContext.Users.update(user)});
    }

    [HttpDelete]
    public JsonResult Delete(long id)
    {
        // return Json(new {});
        return Json(new { result = UserContext.Users.remove(id) });
    }

    [HttpPost]
    public JsonResult Login(User item)
    {
        // return Json(new {});
        Console.WriteLine(item.Username);
        var user = UserContext.Users.get().FirstOrDefault(x => x.Username == item.Username);
        if (user != null)
        {
            if (user.Disabled == true) return Json(new { result = false, message = "User has been Blocked." });
            else if (user.Password == item.Password)
                return Json(new { result = user, message = "Success." });
            else
                return Json(new { result = false, message = "Password is wrong." });
        }
        else
        {
            return Json(new { result = false, message = "User not found." });
        }

    }

}
