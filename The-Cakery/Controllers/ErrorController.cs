using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using The_Cakery.Errors;

namespace The_Cakery.Controllers
{
    [Route("errors/{code}")]
    [ApiExplorerSettings(IgnoreApi =true)]
    public class ErrorController : BaseController
    {
        public IActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}

