using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task<ActionResult<CartDTO>> GetBasket()
        {
            var cart = await RetrieveBasket();

            if (cart == null) return NotFound();
            // return Ok();
            return MapCartToDTO(cart);
        }

        private static CartDTO MapCartToDTO(Cart cart)
        {
            return new CartDTO
            {
                Id = cart.Id,
                BuyerId = cart.BuyerId,
                Items = cart.Items.Select(item => new CartItemDTO
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    ImageUrl = item.Product.ImageUrl,
                    ProductType = item.Product.ProductType,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }

        [HttpPost]
        public async Task<ActionResult<CartDTO>> AddItemToCart(int productId, int quantity)
        {
            //get cart
            var cart = await RetrieveBasket();
            if (cart == null) cart = CreateCart();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            cart.AddItem(product, quantity);

            var results = await _context.SaveChangesAsync() > 0;
            if (results) return CreatedAtRoute("GetCart", MapCartToDTO(cart));
            return BadRequest(new ProblemDetails{Title="Problem saving product to cart"});
        }

        private Cart CreateCart()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var cart = new Cart{BuyerId=buyerId};
            _context.Carts.Add(cart);
            return cart;
        }

        private async Task<Cart> RetrieveBasket()
        {
            var cart = await _context.Carts
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
            return cart;
        }

        //delete does not need to return anything
        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(int productId, int quantity)
        {
            //get cart
            var cart = await RetrieveBasket();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            cart.RemoveItem(productId, quantity);
            var results = await _context.SaveChangesAsync() > 0;
            if (results) return Ok();
            //remove item or reduce quantity
            //save changess
            return BadRequest(new ProblemDetails{Title="Could not delete item from cart"});
        }
    }
}