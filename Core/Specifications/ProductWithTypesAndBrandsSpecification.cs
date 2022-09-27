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
        public ProductWithTypesAndBrandsSpecification()
        {
            AddInclude(c => c.ProductType);
            AddInclude(c => c.ProductBrand);
        }
        public ProductWithTypesAndBrandsSpecification(int id):base(o=>o.Id == id)
        {
            AddInclude(c => c.ProductType);
            AddInclude(c => c.ProductBrand);
        }
    }
}
