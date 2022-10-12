using System.Security.Claims;

namespace The_Cakery.Extentions
{
    public static class ClaimsPrinciapalExtention
    {
        public static string RetriveEmailFromPrincipals(this ClaimsPrincipal user)
        {
            return user.FindFirstValue(ClaimTypes.Email);

        }
    }
}
