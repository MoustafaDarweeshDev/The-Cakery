using AutoMapper;
using Core.Entities.OrderAggregate;
using The_Cakery.DTO;

namespace The_Cakery.Helpers
{
    public class OrderItemUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private readonly IConfiguration config;

        public OrderItemUrlResolver(IConfiguration config)
        {
            this.config = config;
        }

        public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context)
        {
            if (!String.IsNullOrEmpty(source.ItemOrdered.PictureUrl))
            {
                return config["ApiUrl"] +source.ItemOrdered.PictureUrl;
            }

            return null;
        }
    }
}
