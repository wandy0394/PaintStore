using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO;
using api.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers.Extensions
{
    public static class OrderExtensions
    {
        public static IQueryable<OrdersDTO> ProjectOrderToOrderDTO(this IQueryable<Order> query)
        {
            return query
                .Select(order => new OrdersDTO
                {
                    Id = order.Id,
                    BuyerId=order.BuyerId,
                    OrderDate=order.OrderDate,
                    ShippingAddress = order.ShippingAddress,
                    ShippingFee = order.ShippingFee,
                    OrderStatus = order.OrderStatus.ToString(),
                    Total = order.GetTotal(),
                    OrderItems = order.OrderItems.Select(item => new OrderItemDTO
                    {
                        ProductId = item.ItemOrdered.ProductId,
                        Name = item.ItemOrdered.Name,
                        ImageUrl = item.ItemOrdered.ImageUrl,
                        Price = item.Price,
                        Quantity = item.Quantity
                    }).ToList()
                }).AsNoTracking();
        }
    }
}