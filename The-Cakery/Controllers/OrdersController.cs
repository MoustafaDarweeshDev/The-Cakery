using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using The_Cakery.DTO;
using The_Cakery.Errors;
using The_Cakery.Extentions;

namespace The_Cakery.Controllers
{
    [Authorize]
    public class OrdersController:BaseController
    {
        private readonly IOrderService orderService;
        private readonly IMapper mapper;

        public OrdersController(IOrderService orderService , IMapper mapper)
        {
            this.orderService = orderService;
            this.mapper = mapper;
        }


        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderDto orderDto)
        {
            var email = HttpContext.User.RetriveEmailFromPrincipals();
            var address = mapper.Map<AddressDto , Address>(orderDto.ShippingToAdress);
            var order = await orderService.CreateOrderAsync(email, orderDto.DeliveryMethodId,
                orderDto.BasketId, address);

            if (order == null) return BadRequest(new ApiResponse(400, "Problem Creating Order"));

            return Ok(order);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<OrderToReturnDto>>> GetOrdersForUser()
        {
            var email = HttpContext.User.RetriveEmailFromPrincipals();
            var orders = await orderService.GetOrdersForUserAsync(email);
            return Ok(mapper.Map<IReadOnlyList<Order>, IReadOnlyList<OrderToReturnDto>>(orders));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OrderToReturnDto>> GetOrderByIdForUser(int id)
        {
            var email = HttpContext.User.RetriveEmailFromPrincipals();
            var order = await orderService.GetOrderByIdAsync(id, email);
            if (order == null) return NotFound(new ApiResponse(404));
            return Ok(mapper.Map<Order, OrderToReturnDto>(order));
        }

        [HttpGet("deliveryMethods")]
        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethods()
        {

            return await orderService.GetDeliveryMethodsAsync();
        }
    }
}
