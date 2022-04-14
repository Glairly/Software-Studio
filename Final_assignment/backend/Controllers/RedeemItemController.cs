using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

public class RedeemItemController : Controller
{
    private readonly ILogger<RedeemItemController> _logger;

    public RedeemItemController(ILogger<RedeemItemController> logger)
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
        return Json(new  { result = RedeemItemContext.Redeems.get() });
    }

    [HttpGet]
    public JsonResult GetById(long id){
        return Json(new  { result = RedeemItemContext.Redeems.get().FirstOrDefault(x => x.Id == id) });
    }

    [HttpPost]
    public JsonResult Add(RedeemItem item){
        // return Json(new {});
        return Json(new  { result = RedeemItemContext.Redeems.add(item) });
    }

    [HttpPost]
    public JsonResult Init(){
        // return Json(new {});
        return Json(new  { result = RedeemItemContext.Redeems.init() });
    }

    [HttpPut]
    public JsonResult Update(RedeemItem item){
        // return Json(new {});
        return Json(new  { result = RedeemItemContext.Redeems.update(item) });
    }

    [HttpDelete]
    public JsonResult Delete(long id){
        Console.WriteLine(id);
        // return Json(new {});
        return Json(new  { result = RedeemItemContext.Redeems.remove(id) });
    }

}
