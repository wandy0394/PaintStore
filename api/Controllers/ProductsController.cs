using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using api.Controllers.Extensions;
using api.Data;
using api.DTO;
using api.Entities;
using api.RequestHelpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
        public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        public ProductsController(StoreContext context, IMapper mapper)
        {
            _mapper = mapper;
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
            Response.AddPaginationHeader(products.MetaData);
            return products;
        }

        [HttpGet("{id}", Name = "GetProduct")]
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
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm]CreateProductDTO productDTO)
        {
            var product = _mapper.Map<Product>(productDTO);
            _context.Products.Add(product);
            if (productDTO.File != null)
            {
                //TODO: store image in filesystem, update product imageURL
                //generate randomized name for image before storing, good practice
                //product.ImageUrl = ...
            }
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetProduct", new {Id = product.Id}, product);
            return BadRequest(new ProblemDetails{Title = "Problem creating new product"});
        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult> UpdateProduct([FromForm]UpdateProductDTO productDTO)
        {
            var product = await _context.Products.FindAsync(productDTO.Id);
            if (product == null) return NotFound();
            _mapper.Map(productDTO, product);

            if (productDTO.File != null)
            {
                //TODO: store image in filesystem, update product imageURL
                //generate randomized name for image before storing, good practice
                //product.ImageUrl = ...
            }

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return NoContent();

            return BadRequest(new ProblemDetails{Title = "Problem updating products"});
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            var imageUrl = product.ImageUrl;
            if (imageUrl != null)
            {
                //TODO: delete image from filesystem
            }

            _context.Products.Remove(product);




            var result  = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();

            return BadRequest(new ProblemDetails{Title = "Problem deleting product"});
        }
    }
}