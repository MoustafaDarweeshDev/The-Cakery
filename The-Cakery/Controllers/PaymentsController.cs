using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using The_Cakery.Errors;

namespace The_Cakery.Controllers
{
    public class PaymentsController : BaseController
    {
        private readonly IPaymentService paymentService;
        private readonly ILogger<PaymentsController> logger;
        private const string  whSecret = "whsec_713cc0439bdc1e9dc509ef3e7b3cbeb3df1fe5cad9d3eb29f07d5e62a4fab68a";

        public PaymentsController(IPaymentService paymentService, ILogger<PaymentsController> logger)
        {
            this.paymentService = paymentService;
            this.logger = logger;
        }

        [Authorize]
        [HttpPost("{basketid}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var basket = await paymentService.CreateOrUpdatePaymentIntent(basketId);

            if (basket == null) return BadRequest(new ApiResponse(400));

            return basket;
        }

        [HttpPost("wbhooks")]
        public async Task<ActionResult> StripeWebHooks()
        {
            var json = await new  StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"],whSecret);

            PaymentIntent intent;
            Order order;

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    logger.LogInformation("Payment Succeeded: ", intent.Id);
                    order = await paymentService.UpdateOrderPaymentSucceeded(intent.Id);
                    logger.LogInformation("Order Updaed to Payment Received: ", order.Id);
                    break;

                case "payment_intent.payment_failed":
                    intent = (PaymentIntent)stripeEvent.Data.Object;
                    logger.LogInformation("Payment failed: ", intent.Id);
                    order = await paymentService.UpdateOrderPaymentFailed(intent.Id);
                    logger.LogInformation("Order Updaed to Payment Failed: ", order.Id);
                    break;
            }

            return new EmptyResult();
        }
    }
}
