namespace api.DTO
{
    public class CartItemDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public long Price {get;set;}
        public string ImageUrl {get;set;}
        public string Brand {get;set;}
        public string ProductType {get;set;}
        public int Quantity {get;set;}

    }
}