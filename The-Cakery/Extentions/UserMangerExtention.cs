using Core.identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace The_Cakery.Extentions
{
    public static class UserMangerExtention
    {
        public static async Task<AppUser> FindUserWithAddressByEmail(this UserManager<AppUser> userManger,
            ClaimsPrincipal user)
        {
            var email = user.FindFirstValue(ClaimTypes.Email);

            return await userManger.Users.Include(u => u.Address).SingleOrDefaultAsync(x => x.Email == email);
        }
    }
}
