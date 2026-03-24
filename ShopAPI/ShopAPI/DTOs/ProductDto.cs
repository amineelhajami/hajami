namespace ShopAPI.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; }
        public int Stock { get; set; }
        public int CategoryId { get; set; }
        public string Image { get; set; } = string.Empty;
        public string Badge { get; set; } = string.Empty;
        public decimal? Rating { get; set; }
        public int ReviewCount { get; set; }
        public bool Featured { get; set; }
        public bool BestSeller { get; set; }
        public bool NewArrival { get; set; }
        public CategoryDto? Category { get; set; }
    }

    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
    }

    public class AuthResponseDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }

    public class ForgotPasswordDto
    {
        public string Email { get; set; } = string.Empty;
    }
}
