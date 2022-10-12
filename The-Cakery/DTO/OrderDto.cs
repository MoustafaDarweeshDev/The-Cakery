namespace The_Cakery.DTO
{
    public class OrderDto
    {
        public string BasketId { get; set; }
        public int DeliveryMethodId { get; set; }
        public AddressDto ShippingToAdress { get; set; }
    }
}
