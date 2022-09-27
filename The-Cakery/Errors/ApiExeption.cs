namespace The_Cakery.Errors
{
    public class ApiExeption : ApiResponse
    {
        public ApiExeption(int statusCode, string messge = null, string details = null) : base(statusCode, messge)
        {
            Details = details;  
        }

        public string Details { get; set; }
    }
}
