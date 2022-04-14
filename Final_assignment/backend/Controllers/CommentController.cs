using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

public class CommentController : Controller
{
    private readonly ILogger<CommentController> _logger;

    public CommentController(ILogger<CommentController> logger)
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
        return Json(new  { result = CommentContext.Comments.get() });
    }

    [HttpGet]
    public JsonResult GetById(long id){
        return Json(new  { result = CommentContext.Comments.get().FirstOrDefault(x => x.Id == id) });
    }

    [HttpPost]
    public JsonResult Add(Comment item){
        // return Json(new {});
        return Json(new  { result = CommentContext.Comments.add(item) });
    }

    [HttpPost]
    public JsonResult Init(){
        // return Json(new {});
        return Json(new  { result = CommentContext.Comments.init() });
    }

    [HttpPut]
    public JsonResult Update(Comment item){
        // return Json(new {});
        return Json(new  { result = CommentContext.Comments.update(item) });
    }

    [HttpDelete]
    public JsonResult Delete(long id){
        Console.WriteLine(id);
        // return Json(new {});
        return Json(new  { result = CommentContext.Comments.remove(id) });
    }

}
