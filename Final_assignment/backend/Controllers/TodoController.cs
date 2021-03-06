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

    [HttpGet]
    public JsonResult GetById(long id){
        return Json(new  { result = TodoItemContext.Todos.get().FirstOrDefault(x => x.Id == id) });
    }

    [HttpPost]
    public JsonResult Add(TodoItem item){
        // return Json(new {});
        return Json(new  { result = TodoItemContext.Todos.add(item) });
    }

    [HttpPost]
    public JsonResult Init(){
        // return Json(new {});
        return Json(new  { result = TodoItemContext.Todos.init() });
    }

    [HttpPut]
    public JsonResult Update(TodoItem item){
        // return Json(new {});
        return Json(new  { result = TodoItemContext.Todos.update(item) });
    }

    [HttpDelete]
    public JsonResult Delete(long id){
        Console.WriteLine(id);
        // return Json(new {});
        return Json(new  { result = TodoItemContext.Todos.remove(id) });
    }

}
