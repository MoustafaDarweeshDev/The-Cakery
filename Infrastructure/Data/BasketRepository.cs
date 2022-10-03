using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly StackExchange.Redis.IDatabase dataBase;
        public BasketRepository(IConnectionMultiplexer redias)
        {
            this.dataBase = redias.GetDatabase();
        }
        public async Task<bool> deleteBasketAsync(string id)
        {
           return await dataBase.KeyDeleteAsync(id);
           
        }

        public async Task<CustomerBasket> getBasketAsync(string id)
        {
            var data = await dataBase.StringGetAsync(id);
            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);

        }

        public async Task<CustomerBasket> updateBasketAsync(CustomerBasket basket)
        {
            var created = await dataBase.StringSetAsync(basket.Id, JsonSerializer.Serialize(basket),
                TimeSpan.FromDays(30));
            if (!created) return null;

            return await getBasketAsync(basket.Id);
        }
    }
}
