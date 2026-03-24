using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Data;
using ShopAPI.DTOs;
using ShopAPI.Models;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _db;

        public OrderController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderResponseDto>>> GetOrders()
        {
            var userId = GetUserId();
            var orders = await _db.Orders
                .Include(order => order.OrderItems)
                .ThenInclude(item => item.Product)
                .Include(order => order.Payment)
                .Where(order => order.UserId == userId)
                .OrderByDescending(order => order.CreatedAt)
                .ToListAsync();

            return Ok(orders.Select(order => order.ToDto()));
        }

        [HttpPost]
        public async Task<ActionResult<OrderResponseDto>> CreateOrder(OrderDto dto)
        {
            if (dto.Items.Count == 0)
            {
                return BadRequest(new { message = "Order must contain at least one item." });
            }

            var productIds = dto.Items.Select(item => item.ProductId).Distinct().ToList();
            var products = await _db.Products
                .Where(product => productIds.Contains(product.Id))
                .ToDictionaryAsync(product => product.Id);

            if (products.Count != productIds.Count)
            {
                return BadRequest(new { message = "One or more products could not be found." });
            }

            foreach (var item in dto.Items)
            {
                var product = products[item.ProductId];
                if (product.Stock < item.Quantity)
                {
                    return BadRequest(new { message = $"Insufficient stock for {product.Name}." });
                }
            }

            var totalAmount = dto.Items.Sum(item => products[item.ProductId].Price * item.Quantity);
            var order = new Order
            {
                UserId = GetUserId(),
                FullName = dto.FullName,
                Email = dto.Email,
                Address = dto.Address,
                City = dto.City,
                PostalCode = dto.PostalCode,
                Status = dto.PaymentMethod == "CashOnDelivery" ? "Confirmed" : "PendingPayment",
                
                TotalAmount = totalAmount,
                OrderItems = dto.Items.Select(item => new OrderItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = products[item.ProductId].Price
                }).ToList(),
                Payment = new Payment
                {
                    Amount = totalAmount,
                    Method = dto.PaymentMethod,
                    Status = "Pending"
                }
            };

            foreach (var item in dto.Items)
            {
                products[item.ProductId].Stock -= item.Quantity;
            }

            _db.Orders.Add(order);
            await _db.SaveChangesAsync();

            var createdOrder = await _db.Orders
                .Include(item => item.OrderItems)
                .ThenInclude(item => item.Product)
                .Include(item => item.Payment)
                .FirstAsync(item => item.Id == order.Id);

            return CreatedAtAction(nameof(GetOrders), new { id = createdOrder.Id }, createdOrder.ToDto());
        }

        private int GetUserId()
        {
            var claim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return int.Parse(claim!);
        }
    }
}
