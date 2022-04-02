using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Ajax.Models;

namespace Ajax.Controllers;
public class CalculatorController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    [HttpGet]
    public JsonResult Calculate(string num1 = "0",string num2 = "0",string operand = "0"){
        Console.WriteLine(num1);
        Console.WriteLine(num2);
        Console.WriteLine(operand);
        int n1 = int.Parse(num1);
        int n2 = int.Parse(num2);
        int result = 0;

        switch(operand) {
            case "0":
                result = n1 + n2;
            break;
            case "1":
                result = n1 - n2;
            break;
            case "2":
                result = n1 * n2;
            break;
            case "3":
                result = n1 / n2;
            break;
            default:
                result = 0;
            break;
        }

        // ViewBag.Result = result;
        // return View();
        return Json(new { result = result});
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
