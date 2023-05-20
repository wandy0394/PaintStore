using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers.Extensions
{
    public static class CartExtensions
    {
        public static CartDTO MapCartToDTO(this Cart cart)
        {
            return new CartDTO
            {
                Id = cart.Id,
                BuyerId = cart.BuyerId,
                PaymentIntentId = cart.PaymentIntentId,
                ClientSecret = cart.ClientSecret,
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

        public static IQueryable<Cart> RetrieveCartWIthItems(this IQueryable<Cart> query, string buyerId)
        {
            return query.Include(i => i.Items).ThenInclude(p => p.Product).Where(c => c.BuyerId == buyerId);
        }
    }
}