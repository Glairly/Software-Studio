using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

public class LikeController : Controller
{
    private readonly ILogger<LikeController> _logger;

    public LikeController(ILogger<LikeController> logger)
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
        return Json(new  { result = LikeContext.Likes.get() });
    }

    [HttpGet]
    public JsonResult GetById(long id){
        return Json(new  { result = LikeContext.Likes.get().FirstOrDefault(x => x.Id == id) });
    }

    [HttpPost]
    public JsonResult Add(Like item){
        // return Json(new {});
        var isExist = LikeContext.Likes.get().Find(x => x.Owner == item.Owner && x.Blog == item.Blog);
        if(isExist != null)  return Json(new  { result = false, message="Already done that." });
        return Json(new  { result = LikeContext.Likes.add(item), message="Success." });
    }

    [HttpPost]
    public JsonResult Init(){
        // return Json(new {});
        return Json(new  { result = LikeContext.Likes.init() });
    }

    // [HttpPut]
    // public JsonResult Update(Like item){
    //     // return Json(new {});
    //     return Json(new  { result = LikeContext.Likes.update(item) });
    // }

    [HttpDelete]
    public JsonResult Delete(Like item){

        var isExist = LikeContext.Likes.get().Find(x => x.Owner == item.Owner && x.Blog == item.Blog);
        // return Json(new {});
        if(isExist == null)  return Json(new  { result = false, message="Doesn't Exist." });
        return Json(new  { result = LikeContext.Likes.remove(isExist.Id), message="Success." });
    }

}
