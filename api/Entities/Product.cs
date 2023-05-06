namespace api.Entities
{
    public class Product 
    {
        public int Id { get; set; }        
        public string Name { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public string ImageUrl { get; set; }
        public string ProductType { get; set; }
        public string Brand { get; set; }
        public int QuantityInStock { get; set; }
    }
}