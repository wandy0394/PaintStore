using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Controllers.Extensions;
using api.Data;
using api.DTO;
using api.Entities;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        public readonly StoreContext _context;
        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager= userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await _userManager.FindByNameAsync(loginDTO.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password))
                return Unauthorized();

            var userCart = await RetrieveCart(loginDTO.Username);
            var anonCart = await RetrieveCart(Request.Cookies["buyerId"]);

            if (anonCart != null)
            {
                if (userCart != null) _context.Carts.Remove(userCart);
                anonCart.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerId");
                await _context.SaveChangesAsync();
            }
            CartDTO cart = null;
            if (anonCart != null) cart = anonCart.MapCartToDTO();
            if (userCart != null) cart = userCart.MapCartToDTO();
            return new UserDTO
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Cart = cart
            };
        }
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDTO registerDTO) {
            var user = new User
            {
                UserName=registerDTO.Username,
                Email=registerDTO.Email
            };
            var result = await _userManager.CreateAsync(user, registerDTO.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }
            await _userManager.AddToRoleAsync(user, "Member");
            return StatusCode(201);
        }
        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var userCart = await RetrieveCart(User.Identity.Name);

            return new UserDTO
            {
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Cart = userCart?.MapCartToDTO()
            };
        }
        [Authorize]
        [HttpGet("savedAddress")]
        public async Task<ActionResult<UserAddress>> GetSavedAddress()
        {
            return await _userManager.Users
                .Where(x => x.UserName == User.Identity.Name)
                .Select(user => user.Address)
                .FirstOrDefaultAsync();
        }
        private async Task<Cart> RetrieveCart(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId)) 
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }
            var cart = await _context.Carts
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
            return cart;
        }
    }
}