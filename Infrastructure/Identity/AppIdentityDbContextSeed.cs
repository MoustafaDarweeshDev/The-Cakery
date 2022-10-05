using Core.identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManger)
        {
            if(!userManger.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "test",
                    Email = "test@g.com",
                    UserName = "test@g.com",
                    Address = new Address
                    {
                        FirstName = "moustafa",
                        LastName = "Darweesh",
                        Street = "miami Alexandreia",
                        City = "Egypt",
                        State = "Montazah",
                        ZipCode = "51523"
                    }
                };


                await userManger.CreateAsync(user, "Pa$$w0rd");
            }
        } 
    }
}
