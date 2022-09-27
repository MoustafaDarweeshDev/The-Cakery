namespace The_Cakery.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string messge = null)
        {
            StatusCode = statusCode;
            Messge = messge ?? GetDefaultMessgeForStatusCode(statusCode);
        }


        public int StatusCode { get; set; }
        public string Messge { get; set; }
        private string GetDefaultMessgeForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "A Bad Request You Have Made",
                401 => "you are not authrized",
                404 => "Resource Not Found!",
                500 => "We Are Sorry Server Side Error",
                _ => null
            };
        }
    }
}
