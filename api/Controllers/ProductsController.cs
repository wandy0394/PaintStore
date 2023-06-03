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
        private readonly IConfiguration _config;
        public ProductsController(StoreContext context, IMapper mapper, IConfiguration config )
        {
            _config = config;
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
            if (productDTO.File != null && productDTO.File.Length > 0)
            {

                //temporary solution
                //TODO: setup dedicated filestore
                //frontend should fetch images from filestore
                // var randomFileName = Path.GetRandomFileName();
                var fileName = productDTO.File.FileName;

                var filePath = Path.Combine("/home/dev/Desktop/Projects/csharp/PaintStore/storefront/public/images/products", fileName);
                using (var stream = System.IO.File.Create(filePath))
                {
                    await productDTO.File.CopyToAsync(stream);
                }


                var filePath2 = Path.Combine("/home/dev/Desktop/Projects/csharp/PaintStore/api/wwwroot/images/products", fileName);
                using (var stream = System.IO.File.Create(filePath2))
                {
                    await productDTO.File.CopyToAsync(stream);
                }

                product.ImageUrl = Path.Combine(_config["StoredImagepath"], fileName);

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

            if (productDTO.File != null && productDTO.File.Length > 0)
            {

                //temporary solution
                //TODO: setup dedicated filestore
                //frontend should fetch images from filestore
                // var randomFileName = Path.GetRandomFileName();
                var fileName = productDTO.File.FileName;

                var filePath = Path.Combine("/home/dev/Desktop/Projects/csharp/PaintStore/storefront/public/images/products", fileName);
                using (var stream = System.IO.File.Create(filePath))
                {
                    await productDTO.File.CopyToAsync(stream);
                }
                var filePath2 = Path.Combine("/home/dev/Desktop/Projects/csharp/PaintStore/api/wwwroot/images/products", fileName);
                using (var stream = System.IO.File.Create(filePath2))
                {
                    await productDTO.File.CopyToAsync(stream);
                }
                product.ImageUrl = Path.Combine(_config["StoredImagepath"], fileName);

            }

            var result = await _context.SaveChangesAsync() > 0;
            Console.WriteLine(result);
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