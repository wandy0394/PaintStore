using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using api.Controllers.Extensions;
using api.Data;
using api.Entities;
using api.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
        public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts(
            [FromQuery]ProductParams productParams)
        {
            var query =  _context.Products
                                    .Sort(productParams.OrderBy)
                                    .Search(productParams.SearchTerm)
                                    .Filter(productParams.Brands, productParams.ProductTypes)
                                    .AsQueryable();
            var products = await PagedList<Product>.ToPagedList(
                query, productParams.PageNumber, productParams.PageSize);
            // Response.Headers.Add("Pagination", JsonSerializer.Serialize(products.MetaData));
            Response.AddPaginationHeader(products.MetaData);
            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var products =  await _context.Products.FindAsync(id);
            if (products == null) return NotFound();
            return products;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p=>p.Brand).Distinct().ToListAsync();
            var productTypes = await _context.Products.Select(p=>p.ProductType).Distinct().ToListAsync();
            return Ok(new {brands, productTypes});
        }
    }
}