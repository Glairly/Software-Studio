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
        float n1 = float.Parse(num1);
        float n2 = float.Parse(num2);
        float result = 0;

        switch(operand) {
            case "+":
                result = n1 + n2;
            break;
            case "-":
                result = n1 - n2;
            break;
            case "x":
                result = n1 * n2;
            break;
            case "÷":
                if(n2 > 0){
                     result = n1 / n2;
                }else {
                    result = n1;
                }
            break;
            case "%":
                try {
                    result = n1 % n2;
                }catch(Exception e){
                    result = n1;
                }
            break;
            default:
                result = 0;
            break;
        }

        // ViewBag.Result = result;
        // return View();
        return Json(new { result = result });
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
