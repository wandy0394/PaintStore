using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.RequestHelpers
{
    public class ProductParams : PaginationParams
    {
        public string OrderBy { get; set; }
        public string Brands { get; set; }
        public string ProductTypes { get; set; }
        public string SearchTerm { get; set; }

    }
}