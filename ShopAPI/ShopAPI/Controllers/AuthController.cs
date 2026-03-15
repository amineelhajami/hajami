using Microsoft.AspNetCore.Mvc;
using ShopAPI.DTOs;
using ShopAPI.Services;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        
    }
}
