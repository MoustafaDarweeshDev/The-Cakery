using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(o => o.Id).IsRequired();
            builder.Property(o => o.Name).IsRequired().HasMaxLength(100);
            builder.Property(o => o.Description).IsRequired();
            builder.HasOne(o => o.ProductBrand).WithMany()
                .HasForeignKey(o => o.ProductBrandId);
            builder.HasOne(o => o.ProductType).WithMany()
                .HasForeignKey(o => o.ProductTypeId);


        }
    }
}
