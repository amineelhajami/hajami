using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Data;
using ShopAPI.DTOs;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ProductController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProducts()
        {
            var products = await _db.Products
                .Include(product => product.Category)
                .OrderBy(product => product.Name)
                .ToListAsync();

            return Ok(products.Select(product => product.ToDto()));
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductDto>> GetProduct(int id)
        {
            var product = await _db.Products
                .Include(item => item.Category)
                .FirstOrDefaultAsync(item => item.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product.ToDto());
        }
    }
}
