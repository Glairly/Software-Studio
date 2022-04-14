using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

public class RedeemController : Controller
{
    private readonly ILogger<RedeemController> _logger;

    public RedeemController(ILogger<RedeemController> logger)
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
        return Json(new  { result = RedeemContext.Redeems.get() });
    }

    [HttpGet]
    public JsonResult GetById(long id){
        return Json(new  { result = RedeemContext.Redeems.get().FirstOrDefault(x => x.Id == id) });
    }

    [HttpPost]
    public JsonResult Add(Redeem item){
        // return Json(new {});
        return Json(new  { result = RedeemContext.Redeems.add(item) });
    }

    [HttpPost]
    public JsonResult Init(){
        // return Json(new {});
        return Json(new  { result = RedeemContext.Redeems.init() });
    }

    [HttpPut]
    public JsonResult Update(Redeem item){
        // return Json(new {});
        return Json(new  { result = RedeemContext.Redeems.update(item) });
    }

    [HttpDelete]
    public JsonResult Delete(long id){
        Console.WriteLine(id);
        // return Json(new {});
        return Json(new  { result = RedeemContext.Redeems.remove(id) });
    }

}
