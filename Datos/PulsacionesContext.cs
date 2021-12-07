using Microsoft.EntityFrameworkCore;
using Entity;
namespace Datos
{
    public class PulsacionesContext: DbContext

    {
        public PulsacionesContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Persona> Personas { get; set; }
        public DbSet<User> Users { get; set; }

    }
}