using AutoMapper;
using Core.Entities;
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
        }
    }
}
