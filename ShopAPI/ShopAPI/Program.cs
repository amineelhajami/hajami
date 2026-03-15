
using Microsoft.EntityFrameworkCore;
using ShopAPI.Data;

namespace ShopAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // MySQL Verbindung
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
            );

            builder.Services.AddControllers();

            var app = builder.Build();
            app.MapControllers();
            app.Run();
        }
    }
}
