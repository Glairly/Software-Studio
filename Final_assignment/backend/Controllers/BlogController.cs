using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

public class BlogController : Controller
{
    private readonly ILogger<BlogController> _logger;

    public BlogController(ILogger<BlogController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpGet]
    public JsonResult Test()
    {
        return Json(new { result = true });
    }

    [HttpGet]
    public JsonResult List(bool IncludeHide)
    {
        var blogs = BlogContext.Blogs.get().FindAll(x => x.Owner != 0 && (IncludeHide ? true : x.Hidden != true));
        var res = new List<object>();
        foreach (var blog in blogs)
        {
            res.Add(Json(new
            {
                blog = blog,
                comments = CommentContext.Comments.get().FindAll(x => x.Blog == blog.Id).Count,
                likes = LikeContext.Likes.get().FindAll(x => x.Blog == blog.Id).Count
            }).Value);
        }
        return Json(new { result = res });
    }

    [HttpGet]
    public JsonResult ListByOwner(long id)
    {

        var blogs = BlogContext.Blogs.get().FindAll(x => x.Owner == id);
        var res = new List<object>();
        foreach (var blog in blogs)
        {
            res.Add(Json(new
            {
                blog = blog,
                comments = CommentContext.Comments.get().FindAll(x => x.Blog == blog.Id).Count,
                likes = LikeContext.Likes.get().FindAll(x => x.Blog == blog.Id).Count
            }).Value);
        }
        return Json(new { result = res });

    }

    public JsonResult ListAnnoucement()
    {
        var blogs = BlogContext.Blogs.get().FindAll(x => x.Owner == 0 && x.Hidden != true);
        var res = new List<object>();
        foreach (var blog in blogs)
        {
            res.Add(Json(new
            {
                blog = blog,
                comments = CommentContext.Comments.get().FindAll(x => x.Blog == blog.Id).Count,
                likes = LikeContext.Likes.get().FindAll(x => x.Blog == blog.Id).Count
            }).Value);
        }
        return Json(new { result = res });

    }

    [HttpGet]
    public JsonResult GetById(long id)
    {
        var blog = BlogContext.Blogs.get().FirstOrDefault(x => x.Id == id);
        var comments = CommentContext.Comments.get().FindAll(x => x.Blog == id);
        var likes = LikeContext.Likes.get().FindAll(x => x.Blog == id);

        return Json(new
        {
            result = new
            {
                blog = BlogContext.Blogs.get().FirstOrDefault(x => x.Id == id),
                comments = comments,
                likes = likes
            }
        });
    }

    [HttpPost]
    public JsonResult Add(Blog item)
    {
        // return Json(new {});
        return Json(new { result = BlogContext.Blogs.add(item) });
    }

    [HttpPost]
    public JsonResult Init()
    {
        // return Json(new {});
        return Json(new { result = BlogContext.Blogs.init() });
    }

    [HttpPut]
    public JsonResult Hide(long id, bool status)
    {
        // return Json(new {});
        var user = BlogContext.Blogs.get().FirstOrDefault(x => x.Id == id);
        if (user == null) return Json(new { result = false, message = "User not found." });
        user.Hidden = status;
        return Json(new { result = BlogContext.Blogs.update(user) });
    }

    [HttpPut]
    public JsonResult Update(Blog item)
    {
        // return Json(new {});
        return Json(new { result = BlogContext.Blogs.update(item) });
    }

    [HttpDelete]
    public JsonResult Delete(long id)
    {
        Console.WriteLine(id);
        // return Json(new {});
        return Json(new { result = BlogContext.Blogs.remove(id) });
    }

}
