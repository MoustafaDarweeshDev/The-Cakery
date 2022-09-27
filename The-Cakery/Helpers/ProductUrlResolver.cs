using AutoMapper;
using Core.Entities;
using The_Cakery.DTO;

namespace The_Cakery.Helpers
{
    public class ProductUrlResolver : IValueResolver<Product, ProductToReturnDTO, string>
    {
        private readonly IConfiguration config;

        public ProductUrlResolver(IConfiguration config)
        {
            this.config = config;
        }
        public string Resolve(Product source, ProductToReturnDTO destination,
            string destMember, ResolutionContext context)
        {
            if(source.PictureUrl != null)
            {
                return config["ApiUrl"] +source.PictureUrl;
            }
            return null;
        }
    }
}
