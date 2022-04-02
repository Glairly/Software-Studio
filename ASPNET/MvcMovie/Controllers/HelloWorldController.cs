using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;
using MvcMovie.Models;

namespace MvcMovie.Controllers
{
    public class HelloWorldController : Controller
    {
        MovieContext context = new MovieContext();
        // 
        // GET: /HelloWorld/

        public IActionResult Index()
        {
            return View();
        }

        // 
        // GET: /HelloWorld/Welcome/ 


        public IActionResult Welcome(string name,int numTimes = 1)
        {
            ViewData["Message"] = "Hello " + name;
            ViewData["NumTimes"] = numTimes;

            return View();
            // return HtmlEncoder.Default.Encode($"Hello {name}, NumTimes is: {numTimes}");
        }

        [HttpPost]
        public ActionResult createMovie(Movie mov){

            context.Movies.Add(mov);
            context.SaveChanges();
            return Json(new { Message = "SUCCESS"});
        }

        public JsonResult getMovies(){
            List<Movie> movies = new List<Movie>();
            movies =  context.Movies.ToList();
            return Json(movies);
        }
    }
}