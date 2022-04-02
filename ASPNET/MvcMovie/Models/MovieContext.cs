using Microsoft.EntityFrameworkCore;

namespace MvcMovie.Models
{
    public class MovieContext : DbContext  
    {
       public DbSet<Movie> Movies { get; set; }  
    }
}