using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Data;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly AppDbContext _db;

        public PaymentController(AppDbContext db)
        {
            _db = db;
        }

        [Authorize]
        [HttpPatch("{orderId:int}/collect")]
        public async Task<IActionResult> MarkCollected(int orderId)
        {
            var order = await _db.Orders
                .Include(item => item.Payment)
                .FirstOrDefaultAsync(item => item.Id == orderId);

            if (order == null || order.Payment == null)
            {
                return NotFound(new { message = "Order/payment could not be found." });
            }

            order.Payment.Status = "Collected";
            order.Payment.PaidAt = DateTime.UtcNow;
            order.Status = "Delivered";
            await _db.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpPatch("{orderId:int}/cancel")]
        public async Task<IActionResult> MarkCancelled(int orderId)
        {
            var order = await _db.Orders
                .Include(item => item.Payment)
                .FirstOrDefaultAsync(item => item.Id == orderId);

            if (order == null || order.Payment == null)
            {
                return NotFound(new { message = "Order/payment could not be found." });
            }

            order.Payment.Status = "Cancelled";
            order.Status = "Cancelled";
            await _db.SaveChangesAsync();

            return NoContent();
        }
    }
}
