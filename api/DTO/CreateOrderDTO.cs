using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities.OrderAggregate;

namespace api.DTO
{
    public class CreateOrderDTO
    {
        public bool SaveAddresss { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
    }
}