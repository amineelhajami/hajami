using ShopAPI.Models;

namespace ShopAPI.DTOs
{
    public static class ApiMappings
    {
        public static CategoryDto ToDto(this Category category)
        {
            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
                Image = category.ImageUrl
            };
        }

        public static ProductDto ToDto(this Product product)
        {
            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                OldPrice = product.OldPrice,
                Stock = product.Stock,
                CategoryId = product.CategoryId,
                Image = product.ImageUrl,
                Badge = product.Badge,
                Rating = product.Rating,
                ReviewCount = product.ReviewCount,
                Featured = product.IsFeatured,
                BestSeller = product.IsBestSeller,
                NewArrival = product.IsNewArrival,
                Category = product.Category?.ToDto()
            };
        }

        public static OrderResponseDto ToDto(this Order order)
        {
            return new OrderResponseDto
            {
                Id = order.Id.ToString(),
                CreatedAt = order.CreatedAt.ToString("O"),
                Status = order.Status,
                Total = order.TotalAmount,
                CustomerEmail = order.Email,
                ShippingAddress = $"{order.Address}, {order.City}, {order.PostalCode}",
                Payment = new PaymentResponseDto
                {
                    Method = order.Payment?.Method ?? string.Empty,
                    Amount = order.Payment?.Amount ?? order.TotalAmount,
                    Status = order.Payment?.Status ?? "Pending"
                },
                Items = order.OrderItems.Select(item => new OrderItemResponseDto
                {
                    ProductId = item.ProductId,
                    ProductName = item.Product?.Name ?? string.Empty,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice
                }).ToList()
            };
        }
    }
}
