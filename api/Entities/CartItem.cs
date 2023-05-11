using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("CartItems")]
    public class CartItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        //navigation properties. Entity Framework knows how to setup the entity relationships
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int CartId { get; set; }
        public Cart Cart { get; set; }
    }
}