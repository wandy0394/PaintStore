using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Entities;
using Stripe;

namespace api.Services
{
    public class PaymentService
    {
        private long FREE_SHIPPING_THRESH = 10000;
        private long SHIPPING_FEE = 1299;
        private readonly IConfiguration _config;
        public PaymentService(IConfiguration config)
        {
            _config = config;
            
        }
        public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(Cart cart)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];
            var service = new PaymentIntentService();

            var intent = new PaymentIntent();
            var subtotal = cart.Items.Sum(item => item.Quantity*item.Product.Price);
            var shippingFee = subtotal > FREE_SHIPPING_THRESH?0:SHIPPING_FEE;

            if (string.IsNullOrEmpty(cart.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = subtotal + shippingFee,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string>{"card"}
                };
                intent = await service.CreateAsync(options);
            }
            else 
            {
                var options = new PaymentIntentUpdateOptions()
                {
                    Amount = subtotal + shippingFee
                };
                await service.UpdateAsync(cart.PaymentIntentId, options);
            }
            return intent;
        }
    }
}