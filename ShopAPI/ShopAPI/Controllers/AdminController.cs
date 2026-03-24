using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Data;
using ShopAPI.DTOs;
using ShopAPI.Models;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin")]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _db;

        public AdminController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("orders")]
        public async Task<ActionResult<IEnumerable<OrderResponseDto>>> GetOrders()
        {
            var orders = await _db.Orders
                .Include(order => order.OrderItems)
                .ThenInclude(item => item.Product)
                .Include(order => order.Payment)
                .OrderByDescending(order => order.CreatedAt)
                .ToListAsync();

            return Ok(orders.Select(order => order.ToDto()));
        }

        [HttpPost("products")]
        public async Task<ActionResult<ProductDto>> CreateProduct(ProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                OldPrice = dto.OldPrice,
                Stock = dto.Stock,
                CategoryId = dto.CategoryId,
                ImageUrl = dto.Image,
                Badge = dto.Badge,
                Rating = dto.Rating,
                ReviewCount = dto.ReviewCount,
                IsFeatured = dto.Featured,
                IsBestSeller = dto.BestSeller,
                IsNewArrival = dto.NewArrival
            };

            _db.Products.Add(product);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateProduct), new { id = product.Id }, product.ToDto());
        }

        [HttpPatch("products/{id:int}")]
        public async Task<ActionResult<ProductDto>> UpdateProduct(int id, ProductDto dto)
        {
            var product = await _db.Products.FirstOrDefaultAsync(item => item.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.OldPrice = dto.OldPrice;
            product.Stock = dto.Stock;
            product.CategoryId = dto.CategoryId;
            product.ImageUrl = dto.Image;
            product.Badge = dto.Badge;
            product.Rating = dto.Rating;
            product.ReviewCount = dto.ReviewCount;
            product.IsFeatured = dto.Featured;
            product.IsBestSeller = dto.BestSeller;
            product.IsNewArrival = dto.NewArrival;

            await _db.SaveChangesAsync();
            return Ok(product.ToDto());
        }

        [HttpPatch("orders/{id:int}")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] string status)
        {
            var order = await _db.Orders.Include(item => item.Payment).FirstOrDefaultAsync(item => item.Id == id);
            if (order == null)
            {
                return NotFound();
            }

            order.Status = status;
            if (order.Payment != null && status == "Delivered")
            {
                order.Payment.Status = "Collected";
                order.Payment.PaidAt = DateTime.UtcNow;
            }
            else if (order.Payment != null && status == "Cancelled")
            {
                order.Payment.Status = "Cancelled";
            }

            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
