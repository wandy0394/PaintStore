using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Controllers.Extensions;
using api.Data;
using api.DTO;
using api.Entities;
using api.Entities.OrderAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Authorize]
    public class OrdersController : BaseApiController
    {
        public readonly StoreContext _context;
        private readonly long FREE_SHIPPING_THRESH = 10000;
        private readonly long SHIPPING_FEE = 1299;
        public OrdersController(StoreContext context)
        {
            _context = context;
            
        }

        [HttpGet]
        public async Task<ActionResult<List<OrdersDTO>>> GetOrders()
        {
            return await _context.Orders
                .ProjectOrderToOrderDTO()
                .Where(x => x.BuyerId == User.Identity.Name)
                .ToListAsync();

        }
        [HttpGet("{id}", Name="GetOrder")]
        public async Task<ActionResult<OrdersDTO>> GetOrder(int id)
        {
            return await _context.Orders
                .ProjectOrderToOrderDTO()
                .Where(x => (x.BuyerId == User.Identity.Name && x.Id == id))
                .FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDTO orderDTO)
        {
            var cart = await _context.Carts
                .RetrieveCartWIthItems(User.Identity.Name)
                .FirstOrDefaultAsync();

            if (cart == null) return BadRequest(new ProblemDetails{Title = "Could not find cart"});
            var items = new List<OrderItem>();

            foreach (var item in cart.Items)
            {
                var productItem = await _context.Products.FindAsync(item.ProductId);
                var itemOrdered = new ProductItemOrdered
                {
                    ProductId = productItem.Id,
                    Name = productItem.Name,
                    ImageUrl = productItem.ImageUrl
                };
                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity
                };
                items.Add(orderItem);
                productItem.QuantityInStock -= item.Quantity;
            }
            var subtotal = items.Sum(item => item.Price * item.Quantity);
            var shippingFee = subtotal > FREE_SHIPPING_THRESH ? 0 : SHIPPING_FEE;

            var order = new Order
            {
                OrderItems = items,
                BuyerId = User.Identity.Name,
                ShippingAddress = orderDTO.ShippingAddress,
                Subtotal = subtotal,
                ShippingFee = shippingFee,
                PaymentIntentId = cart.PaymentIntentId
            };

            _context.Orders.Add(order);
            _context.Carts.Remove(cart);

            if (orderDTO.SaveAddress)
            {
                var user = await _context.Users
                    .Include(a => a.Address)
                    .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);
                var address = new UserAddress
                {
                    FullName = orderDTO.ShippingAddress.FullName,
                    Address1 = orderDTO.ShippingAddress.Address1,
                    Address2 = orderDTO.ShippingAddress.Address2,
                    City = orderDTO.ShippingAddress.City,
                    State = orderDTO.ShippingAddress.State,
                    Zipcode = orderDTO.ShippingAddress.Zipcode,
                    Country = orderDTO.ShippingAddress.Country
                };
                user.Address = address;
                
                _context.Update(user); 
            }
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetOrder", new {id = order.Id}, order.Id);
            return BadRequest("Problem creating order");
        }
    }
}