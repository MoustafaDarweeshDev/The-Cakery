using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IBasketRepository basketRepo;

        public OrderService(IUnitOfWork unitOfWork, IBasketRepository basketRepo)
        {
            this.unitOfWork = unitOfWork;
            this.basketRepo = basketRepo;
        }
        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId,
            string basketId, Address shippingAddress)
        {
            //get the basket 
            var basket = await basketRepo.getBasketAsync(basketId);
            //get items from product repo
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id , productItem.Name , productItem.PictureUrl );
                var orderItem = new OrderItem(itemOrdered,productItem.Price,item.Quantity);
                items.Add(orderItem);
            }
            //get dm 
            var delivryMethod = await unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);
            //calc subtotal
            var subTotal = items.Sum(i=>i.Price * i.Quantity);
            //create order
            var order = new Order(items , buyerEmail , shippingAddress , delivryMethod , subTotal);
            unitOfWork.Repository<Order>().Add(order);
            // To DO : save to db
            var resault = await unitOfWork.Complete();

            if (resault <= 0) return null;

            //delete basket 
            await basketRepo.deleteBasketAsync(basketId);

            //return order
            return order;

        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
           return await unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithOrdersAndOrderingSpecification(id,buyerEmail);
            return await unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithOrdersAndOrderingSpecification(buyerEmail);
            return await unitOfWork.Repository<Order>().ListAll(spec);
        }
    }
}
