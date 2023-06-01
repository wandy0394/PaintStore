using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO
{
    public class CreateProductDTO
    {    
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        [Range(100, Double.PositiveInfinity)]
        public long Price { get; set; }
 
        public IFormFile File { get; set; }
        [Required]
        public string ProductType { get; set; }
        [Required]
        public string Brand { get; set; }
        [Required]
        [Range(0,200)]
        public int QuantityInStock { get; set; }
    }
}