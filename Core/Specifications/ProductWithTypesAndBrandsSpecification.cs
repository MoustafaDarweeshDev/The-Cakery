using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class ProductWithTypesAndBrandsSpecification:BaseSpecification<Product>
    {
        public ProductWithTypesAndBrandsSpecification(ProductSpecParams productParams)
            :base(x=>
            (String.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
            (!productParams.BrandId.HasValue || x.ProductBrandId == productParams.BrandId)  &&
            (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId)
            )
        {
            AddInclude(c => c.ProductType);
            AddInclude(c => c.ProductBrand);
            AddOrderBy(x => x.Name); 
            ApplyPaging(productParams.PageSize * (productParams.PageIndex -1) , productParams.PageSize);

            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch(productParams.Sort)
                {
                    case "priceasc":
                        AddOrderBy(o=>o.Price);
                            break;
                    case "pricedesc":
                        AddOrderByDescending(o=>o.Price);
                        break;


                    default:
                        AddOrderBy(o => o.Name);
                        break;
                }
            }
        }


        public ProductWithTypesAndBrandsSpecification(int id):base(o=>o.Id == id)
        {
            AddInclude(c => c.ProductType);
            AddInclude(c => c.ProductBrand);
        }
    }
}
