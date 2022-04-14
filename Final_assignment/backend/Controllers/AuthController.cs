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
    public JsonResult Test(){
        return Json(new  { result = true });
    }

    public JsonResult List(){
        return Json(new  { result = UserContext.Users.get() });
    }

    [HttpGet]
    public JsonResult GetById(long id){
        return Json(new  { result = UserContext.Users.get().FirstOrDefault(x => x.Id == id) });
    }

    [HttpPost]
    public JsonResult Add(User item){
        // return Json(new {});
        return Json(new  { result = UserContext.Users.add(item) });
    }

    [HttpPost]
    public JsonResult Init(){
        // return Json(new {});
        return Json(new  { result = UserContext.Users.init() });
    }

    [HttpPut]
    public JsonResult Update(User item){
        // return Json(new {});
        return Json(new  { result = UserContext.Users.update(item) });
    }

    [HttpPut]
    public JsonResult ChangePassword(User item){
        // return Json(new {});
        return Json(new  { result = UserContext.Users.updatePassword(item) });
    }

    [HttpDelete]
    public JsonResult Delete(long id){
        Console.WriteLine(id);
        // return Json(new {});
        return Json(new  { result = UserContext.Users.remove(id) });
    }

    [HttpPost]
    public JsonResult Login(User item){
        // return Json(new {});
        Console.WriteLine(item);
        var user = UserContext.Users.get().FirstOrDefault(x => x.Username == item.Username);
        if(user != null) {
            if(user.Password == item.Password)
                return Json(new  { result = user, message = "Success." });
            else
                return Json(new { result = false, message = "Password is wrong." });
        }else {
            return Json(new  { result = false, message = "User not found." });
        }
         
    }

}
