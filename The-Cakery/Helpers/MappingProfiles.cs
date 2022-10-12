using AutoMapper;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.identity;
using The_Cakery.DTO;

namespace The_Cakery.Helpers
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDTO>()
                .ForMember(dto => dto.ProductBrand, p => p.MapFrom(o => o.ProductBrand.Name))
                .ForMember(dto => dto.ProductType, p => p.MapFrom(o => o.ProductType.Name))
                .ForMember(dto=>dto.PictureUrl , p=>p.MapFrom<ProductUrlResolver>());

            CreateMap<Core.identity.Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto,BasketItem>();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(o=>o.DeliveryMethod , p=>p.MapFrom(x=>x.DeliveryMethod.ShortName))
                .ForMember(o=>o.ShippingPrice , p=>p.MapFrom(x=>x.DeliveryMethod.Price));
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(o => o.ProductId, p => p.MapFrom(x => x.ItemOrdered.ProductItemId))
                .ForMember(o => o.ProductName, p => p.MapFrom(x => x.ItemOrdered.ProductName))
                .ForMember(o => o.PictureUrl, p => p.MapFrom(x => x.ItemOrdered.PictureUrl))
                .ForMember(o => o.PictureUrl, p => p.MapFrom<OrderItemUrlResolver>());
        }
    }
}
