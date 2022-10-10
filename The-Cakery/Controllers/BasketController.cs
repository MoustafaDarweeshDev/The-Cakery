using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using The_Cakery.DTO;

namespace The_Cakery.Controllers
{
    public class BasketController:BaseController
    {
        private readonly IBasketRepository basketRepo;
        private readonly IMapper mapper;

        public BasketController(IBasketRepository basketRepo , IMapper mapper)
        {
            this.basketRepo = basketRepo;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketById(string id)
        {
            var basket= await basketRepo.getBasketAsync(id);
            return Ok(basket ?? new CustomerBasket(id));
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasketAsync(CustomerBasketDto basket)
        {
            var customerBasket = mapper.Map<CustomerBasketDto , CustomerBasket>(basket);
            var updatedBasket = await basketRepo.updateBasketAsync(customerBasket);
            return Ok(updatedBasket);
        }

        [HttpDelete]
        public async Task DeleteBasket(string id)
        {
            await basketRepo.deleteBasketAsync(id);
        }
    }
}
