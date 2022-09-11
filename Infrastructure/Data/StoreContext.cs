using Cakery.Entities;
using Microsoft.EntityFrameworkCore;

namespace Cakery.Data
{
    public class StoreContext:DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options):base(options)
        {

        }

        public DbSet<Product> Products { get; set; }

    }
}
