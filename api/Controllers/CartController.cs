using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Controllers.Extensions;
using api.Data;
using api.DTO;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly StoreContext _context;
        public CartController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetCart")]
        public async Task<ActionResult<CartDTO>> GetCart()
        {
            var buyerId = GetBuyerId();
            var cart = await RetrieveCart(buyerId);

            if (cart == null) return NotFound();
            // return Ok();
            return cart.MapCartToDTO();
        }


        [HttpPost]
        public async Task<ActionResult<CartDTO>> AddItemToCart(int productId, int quantity)
        {
            //get cart
            var buyerId = GetBuyerId();
            var cart = await RetrieveCart(buyerId);
            if (cart == null) cart = CreateCart();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails{Title="Product not found."});
            cart.AddItem(product, quantity);

            var results = await _context.SaveChangesAsync() > 0;
            if (results) return CreatedAtRoute("GetCart", cart.MapCartToDTO());
            return BadRequest(new ProblemDetails{Title="Problem saving product to cart"});
        }

        private Cart CreateCart()
        {
            //if user is logged in, buyerId is just their name (for now)
            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }

            var cart = new Cart{BuyerId=buyerId};
            _context.Carts.Add(cart);
            return cart;
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

        private string GetBuyerId()
        {
            //if user is logged in, buyerId is just their name (for now)
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }

        //delete does not need to return anything
        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(int productId, int quantity)
        {
            var buyerId = GetBuyerId();
            var cart = await RetrieveCart(buyerId);
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails{Title="Problem removing item from cart."});
            cart.RemoveItem(productId, quantity);
            var results = await _context.SaveChangesAsync() > 0;
            if (results) return Ok();
            return BadRequest(new ProblemDetails{Title="Could not delete item from cart"});
        }
    }
}