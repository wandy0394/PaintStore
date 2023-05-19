using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO
{
    public class UserDTO
    {
        public string Email { get; set; }
        public string Token { get; set; }
        public CartDTO Cart { get; set; }
    }
}