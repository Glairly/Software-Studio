using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

public class TodoController : Controller
{
    private readonly ILogger<TodoController> _logger;

    public TodoController(ILogger<TodoController> logger)
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
        return Json(new  { result = TodoItemContext.Todos.get() });
    }

    [HttpPost]
    public JsonResult AddDummy(){
        try {
            List<TodoItem> res = TodoItemContext.Todos.addDummy();
            return Json(new  { result = res  });
        }catch(Exception e){
            return Json(new  { result = false  });
        }
    }


}
