using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO
{
    public class CartDTO
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<CartItemDTO> Items { get; set; }

    }
}